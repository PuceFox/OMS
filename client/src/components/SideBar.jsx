import React from "react";
import { IconButton, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Accordion, AccordionHeader, AccordionBody, Alert, Input, Drawer, Card } from "@material-tailwind/react";
import { PresentationChartBarIcon, ShoppingBagIcon, UserCircleIcon, Cog6ToothIcon, InboxIcon, PowerIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link as NavLink, useNavigate } from "react-router-dom";
export default function SideBar() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  // const navigate = useNavigate();

  async function handleLogout() {
    localStorage.clear();
    // navigate("/login");
  }

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? <XMarkIcon className="h-8 w-8 stroke-2" /> : <Bars3Icon className="h-8 w-8 stroke-2" />}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card color="transparent" shadow={false} className="h-[calc(100vh-2rem)] w-full p-4">
          <div className="mb-2 flex items-center gap-4 p-4">
            <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" />
            <Typography variant="h5" color="blue-gray">
              Sidebar
            </Typography>
          </div>
          <div className="p-2">
            <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Search" />
          </div>
          <List>
            <NavLink to={"/dashboard"}>
              <ListItem>
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                Dashboard
              </ListItem>
            </NavLink>

            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Inbox
              <ListItemSuffix>
                <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
              </ListItemSuffix>
            </ListItem>

            <NavLink to={"/profile"}>
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Profile
              </ListItem>
            </NavLink>

            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
            <NavLink onClick={handleLogout}>
              <ListItem>
                <ListItemPrefix>
                  <PowerIcon className="h-5 w-5" />
                </ListItemPrefix>
                Log Out
              </ListItem>
            </NavLink>
          </List>
        </Card>
      </Drawer>
    </>
  );
}
