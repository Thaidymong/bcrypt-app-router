import gql from "graphql-tag";

export const QUERY_USERS = gql`
  query Query {
    users {
      id
      first_name
      last_name
      email
      password
    }
  }
`;

export const MUTATION_SIGNIN = gql`
  mutation SignIn($input: SignInInput) {
    signIn(input: $input) {
      token
    }
  }
`;
