import { gql } from "@apollo/client";

export const MUTATION_LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      oauthUrl
    }
  }
`;
