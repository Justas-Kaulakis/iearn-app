import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type About = {
  __typename?: 'About';
  id: Scalars['Float'];
  content: Scalars['String'];
  imageUrl: Scalars['String'];
};

export type AboutInput = {
  content: Scalars['String'];
  image?: Maybe<Scalars['Upload']>;
};

export type Admin = {
  __typename?: 'Admin';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type AdminLogInput = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type AdminRegInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type AdminResponse = {
  __typename?: 'AdminResponse';
  errors?: Maybe<Array<FieldError>>;
  admin?: Maybe<Admin>;
};

export type BodyImage = {
  __typename?: 'BodyImage';
  imageName: Scalars['String'];
};

export type ChangePasswordInput = {
  password: Scalars['String'];
  newPassword: Scalars['String'];
};

export type ChangeUsernameEmailInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type CleanAdminRes = {
  __typename?: 'CleanAdminRes';
  id: Scalars['Float'];
  email: Scalars['String'];
  username: Scalars['String'];
};

export type Contacts = {
  __typename?: 'Contacts';
  id: Scalars['Float'];
  contact?: Maybe<Scalars['String']>;
};


export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GalleryImage = {
  __typename?: 'GalleryImage';
  id: Scalars['Float'];
  imageUrl: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
};

export type GalleryInput = {
  description: Scalars['String'];
  image?: Maybe<Scalars['Upload']>;
};

export type Generation = {
  __typename?: 'Generation';
  id: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
  images?: Maybe<Array<GenerationImage>>;
  projects?: Maybe<Array<Project>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type GenerationImage = {
  __typename?: 'GenerationImage';
  id: Scalars['Float'];
  imageUrl: Scalars['String'];
  createdAt: Scalars['DateTime'];
};

export type GenerationInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  projectIds?: Maybe<Array<Scalars['Int']>>;
  images?: Maybe<Array<Scalars['Upload']>>;
};

export type Member = {
  __typename?: 'Member';
  id: Scalars['Float'];
  fullName: Scalars['String'];
  description: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type MemberInput = {
  fullName: Scalars['String'];
  description: Scalars['String'];
  image?: Maybe<Scalars['Upload']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createMember: Member;
  updateMember: Member;
  deleteMember: Scalars['Boolean'];
  addPicture: Scalars['Boolean'];
  register: AdminResponse;
  login: AdminResponse;
  logout: Scalars['Boolean'];
  changeUsernameEmail?: Maybe<Array<FieldError>>;
  changePassword?: Maybe<Array<FieldError>>;
  forgotPassword: Scalars['Boolean'];
  changePasswordToken?: Maybe<Array<FieldError>>;
  createProject: Project;
  updateProject: Project;
  deleteProject: Scalars['Boolean'];
  updateLinks: Scalars['Boolean'];
  updateContacts: Scalars['Boolean'];
  createGalleryImage: Scalars['Int'];
  updateGalleryImage: Scalars['Boolean'];
  deleteGalleryImage: Scalars['Boolean'];
  updateAbout: Scalars['Boolean'];
  createGeneration: Scalars['Int'];
  updateGeneration: Scalars['Boolean'];
  deleteGenenration: Scalars['Boolean'];
  deleteGenImage: Scalars['Boolean'];
  removeGenProject: Scalars['Boolean'];
};


export type MutationCreateMemberArgs = {
  input: MemberInput;
};


export type MutationUpdateMemberArgs = {
  input: MemberInput;
  id: Scalars['Int'];
};


export type MutationDeleteMemberArgs = {
  id: Scalars['Int'];
};


export type MutationAddPictureArgs = {
  upload: Scalars['Upload'];
};


export type MutationRegisterArgs = {
  options: AdminRegInput;
};


export type MutationLoginArgs = {
  options: AdminLogInput;
};


export type MutationChangeUsernameEmailArgs = {
  input: ChangeUsernameEmailInput;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationChangePasswordTokenArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  input: ProjectInput;
};


export type MutationUpdateProjectArgs = {
  input: ProjectInput;
  id: Scalars['Int'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateLinksArgs = {
  input: SocialLinksInput;
  id: Scalars['Int'];
};


export type MutationUpdateContactsArgs = {
  contacts: Array<MyContact>;
};


export type MutationCreateGalleryImageArgs = {
  input: GalleryInput;
};


export type MutationUpdateGalleryImageArgs = {
  input: GalleryInput;
  id: Scalars['Int'];
};


export type MutationDeleteGalleryImageArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateAboutArgs = {
  input: AboutInput;
  id: Scalars['Int'];
};


export type MutationCreateGenerationArgs = {
  input: GenerationInput;
};


export type MutationUpdateGenerationArgs = {
  input: GenerationInput;
  id: Scalars['Int'];
};


export type MutationDeleteGenenrationArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteGenImageArgs = {
  imgId: Scalars['Int'];
  genId: Scalars['Int'];
};


export type MutationRemoveGenProjectArgs = {
  projId: Scalars['Int'];
  genId: Scalars['Int'];
};

export type MyContact = {
  id: Scalars['Int'];
  contact: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
  body: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  generation?: Maybe<Generation>;
  isPublished: Scalars['Boolean'];
  wasPublished: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  publishedAt?: Maybe<Scalars['String']>;
  bodyImages: Array<BodyImage>;
};

export type ProjectInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  body: Scalars['String'];
  image?: Maybe<Scalars['Upload']>;
  isPublished: Scalars['Boolean'];
};

export type ProjectRes = {
  __typename?: 'ProjectRes';
  error?: Maybe<Scalars['String']>;
  project?: Maybe<Project>;
  authorized?: Maybe<Scalars['Boolean']>;
};

export type ProjectsRes = {
  __typename?: 'ProjectsRes';
  total: Scalars['Int'];
  hasMore: Scalars['Boolean'];
  projects?: Maybe<Array<Project>>;
};

export type Query = {
  __typename?: 'Query';
  member?: Maybe<Member>;
  members?: Maybe<Array<Member>>;
  admins?: Maybe<Array<Admin>>;
  me?: Maybe<CleanAdminRes>;
  isLoggedIn: Scalars['Boolean'];
  project?: Maybe<ProjectRes>;
  projects: ProjectsRes;
  searchProjects?: Maybe<Array<SearchProjectRes>>;
  adminProjects?: Maybe<Array<Project>>;
  socialLinks: SocialLinks;
  contacts: Array<Contacts>;
  galleryImages?: Maybe<Array<GalleryImage>>;
  getAbout: About;
  generations?: Maybe<Array<Generation>>;
};


export type QueryMemberArgs = {
  id: Scalars['Int'];
};


export type QueryProjectArgs = {
  id: Scalars['Int'];
};


export type QueryProjectsArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type SearchProjectRes = {
  __typename?: 'SearchProjectRes';
  id: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
};

export type SocialLinks = {
  __typename?: 'SocialLinks';
  id: Scalars['Float'];
  instagram?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
  iearnGlobal?: Maybe<Scalars['String']>;
};

export type SocialLinksInput = {
  instagram: Scalars['String'];
  facebook: Scalars['String'];
  youtube: Scalars['String'];
  iearnGlobal: Scalars['String'];
};


export type GenerationFragment = (
  { __typename?: 'Generation' }
  & Pick<Generation, 'id' | 'title' | 'description'>
  & { images?: Maybe<Array<(
    { __typename?: 'GenerationImage' }
    & Pick<GenerationImage, 'id' | 'imageUrl'>
  )>>, projects?: Maybe<Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'title' | 'description' | 'imageUrl'>
  )>> }
);

export type ProjectResponseFragment = (
  { __typename?: 'Project' }
  & Pick<Project, 'id' | 'title' | 'description' | 'imageUrl' | 'isPublished'>
);

export type TableMemberFragment = (
  { __typename?: 'Member' }
  & Pick<Member, 'id' | 'fullName' | 'description' | 'imageUrl'>
);

export type AddPictureMutationVariables = Exact<{
  upload: Scalars['Upload'];
}>;


export type AddPictureMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addPicture'>
);

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & Pick<FieldError, 'field' | 'message'>
  )>> }
);

export type ChangePasswordTokenMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordTokenMutation = (
  { __typename?: 'Mutation' }
  & { changePasswordToken?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & Pick<FieldError, 'field' | 'message'>
  )>> }
);

export type ChangeUsernameEmailMutationVariables = Exact<{
  input: ChangeUsernameEmailInput;
}>;


export type ChangeUsernameEmailMutation = (
  { __typename?: 'Mutation' }
  & { changeUsernameEmail?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & Pick<FieldError, 'field' | 'message'>
  )>> }
);

export type CreateGalleryImageMutationVariables = Exact<{
  input: GalleryInput;
}>;


export type CreateGalleryImageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createGalleryImage'>
);

export type CreateGenerationMutationVariables = Exact<{
  input: GenerationInput;
}>;


export type CreateGenerationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createGeneration'>
);

export type CreateMemberMutationVariables = Exact<{
  input: MemberInput;
}>;


export type CreateMemberMutation = (
  { __typename?: 'Mutation' }
  & { createMember: (
    { __typename?: 'Member' }
    & Pick<Member, 'id' | 'fullName' | 'imageUrl' | 'description' | 'createdAt'>
  ) }
);

export type CreateProjectMutationVariables = Exact<{
  input: ProjectInput;
}>;


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject: (
    { __typename?: 'Project' }
    & ProjectResponseFragment
  ) }
);

export type DeleteGalleryImageMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteGalleryImageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteGalleryImage'>
);

export type DeleteGenImageMutationVariables = Exact<{
  genId: Scalars['Int'];
  imgId: Scalars['Int'];
}>;


export type DeleteGenImageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteGenImage'>
);

export type DeleteMemberMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteMemberMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMember'>
);

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteProjectMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteProject'>
);

export type ForgotPasswordMutationVariables = Exact<{ [key: string]: never; }>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  options: AdminLogInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AdminResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RemoveGenProjectMutationVariables = Exact<{
  genId: Scalars['Int'];
  projId: Scalars['Int'];
}>;


export type RemoveGenProjectMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeGenProject'>
);

export type UpdateAboutMutationVariables = Exact<{
  id: Scalars['Int'];
  input: AboutInput;
}>;


export type UpdateAboutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateAbout'>
);

export type UpdateContactsMutationVariables = Exact<{
  contacts: Array<MyContact> | MyContact;
}>;


export type UpdateContactsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateContacts'>
);

export type UpdateGalleryImageMutationVariables = Exact<{
  id: Scalars['Int'];
  input: GalleryInput;
}>;


export type UpdateGalleryImageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateGalleryImage'>
);

export type UpdateGenerationMutationVariables = Exact<{
  id: Scalars['Int'];
  input: GenerationInput;
}>;


export type UpdateGenerationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateGeneration'>
);

export type UpdateLinksMutationVariables = Exact<{
  id: Scalars['Int'];
  input: SocialLinksInput;
}>;


export type UpdateLinksMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateLinks'>
);

export type UpdateMemberMutationVariables = Exact<{
  id: Scalars['Int'];
  input: MemberInput;
}>;


export type UpdateMemberMutation = (
  { __typename?: 'Mutation' }
  & { updateMember: (
    { __typename?: 'Member' }
    & Pick<Member, 'id' | 'fullName' | 'description' | 'createdAt'>
  ) }
);

export type UpdateProjectMutationVariables = Exact<{
  id: Scalars['Int'];
  input: ProjectInput;
}>;


export type UpdateProjectMutation = (
  { __typename?: 'Mutation' }
  & { updateProject: (
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'title' | 'description' | 'imageUrl' | 'body' | 'isPublished'>
  ) }
);

export type AdminProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminProjectsQuery = (
  { __typename?: 'Query' }
  & { adminProjects?: Maybe<Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'title' | 'description' | 'imageUrl' | 'isPublished' | 'publishedAt'>
  )>> }
);

export type ContactsQueryVariables = Exact<{ [key: string]: never; }>;


export type ContactsQuery = (
  { __typename?: 'Query' }
  & { contacts: Array<(
    { __typename?: 'Contacts' }
    & Pick<Contacts, 'id' | 'contact'>
  )> }
);

export type GalleryImagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GalleryImagesQuery = (
  { __typename?: 'Query' }
  & { galleryImages?: Maybe<Array<(
    { __typename?: 'GalleryImage' }
    & Pick<GalleryImage, 'id' | 'imageUrl' | 'description'>
  )>> }
);

export type GenerationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GenerationsQuery = (
  { __typename?: 'Query' }
  & { generations?: Maybe<Array<(
    { __typename?: 'Generation' }
    & GenerationFragment
  )>> }
);

export type GetAboutQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAboutQuery = (
  { __typename?: 'Query' }
  & { getAbout: (
    { __typename?: 'About' }
    & Pick<About, 'id' | 'content' | 'imageUrl'>
  ) }
);

export type IsLoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type IsLoggedInQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'isLoggedIn'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'CleanAdminRes' }
    & Pick<CleanAdminRes, 'id' | 'username' | 'email'>
  )> }
);

export type ProjectQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProjectQuery = (
  { __typename?: 'Query' }
  & { project?: Maybe<(
    { __typename?: 'ProjectRes' }
    & Pick<ProjectRes, 'error' | 'authorized'>
    & { project?: Maybe<(
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'title' | 'description' | 'body' | 'imageUrl' | 'isPublished' | 'publishedAt'>
    )> }
  )> }
);

export type ProjectsQueryVariables = Exact<{
  offset: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type ProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: (
    { __typename?: 'ProjectsRes' }
    & Pick<ProjectsRes, 'total' | 'hasMore'>
    & { projects?: Maybe<Array<(
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'title' | 'description' | 'imageUrl' | 'isPublished' | 'createdAt'>
    )>> }
  ) }
);

export type SearchProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type SearchProjectsQuery = (
  { __typename?: 'Query' }
  & { searchProjects?: Maybe<Array<(
    { __typename?: 'SearchProjectRes' }
    & Pick<SearchProjectRes, 'id' | 'title' | 'description'>
  )>> }
);

export type SocialLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type SocialLinksQuery = (
  { __typename?: 'Query' }
  & { socialLinks: (
    { __typename?: 'SocialLinks' }
    & Pick<SocialLinks, 'id' | 'instagram' | 'facebook' | 'youtube' | 'iearnGlobal'>
  ) }
);

export type MembersQueryVariables = Exact<{ [key: string]: never; }>;


export type MembersQuery = (
  { __typename?: 'Query' }
  & { members?: Maybe<Array<(
    { __typename?: 'Member' }
    & TableMemberFragment
  )>> }
);

export const GenerationFragmentDoc = gql`
    fragment Generation on Generation {
  id
  title
  description
  images {
    id
    imageUrl
  }
  projects {
    id
    title
    description
    imageUrl
  }
}
    `;
export const ProjectResponseFragmentDoc = gql`
    fragment ProjectResponse on Project {
  id
  title
  description
  imageUrl
  isPublished
}
    `;
export const TableMemberFragmentDoc = gql`
    fragment TableMember on Member {
  id
  fullName
  description
  imageUrl
}
    `;
export const AddPictureDocument = gql`
    mutation AddPicture($upload: Upload!) {
  addPicture(upload: $upload)
}
    `;

export function useAddPictureMutation() {
  return Urql.useMutation<AddPictureMutation, AddPictureMutationVariables>(AddPictureDocument);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    field
    message
  }
}
    `;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const ChangePasswordTokenDocument = gql`
    mutation ChangePasswordToken($token: String!, $newPassword: String!) {
  changePasswordToken(token: $token, newPassword: $newPassword) {
    field
    message
  }
}
    `;

export function useChangePasswordTokenMutation() {
  return Urql.useMutation<ChangePasswordTokenMutation, ChangePasswordTokenMutationVariables>(ChangePasswordTokenDocument);
};
export const ChangeUsernameEmailDocument = gql`
    mutation ChangeUsernameEmail($input: ChangeUsernameEmailInput!) {
  changeUsernameEmail(input: $input) {
    field
    message
  }
}
    `;

export function useChangeUsernameEmailMutation() {
  return Urql.useMutation<ChangeUsernameEmailMutation, ChangeUsernameEmailMutationVariables>(ChangeUsernameEmailDocument);
};
export const CreateGalleryImageDocument = gql`
    mutation CreateGalleryImage($input: GalleryInput!) {
  createGalleryImage(input: $input)
}
    `;

export function useCreateGalleryImageMutation() {
  return Urql.useMutation<CreateGalleryImageMutation, CreateGalleryImageMutationVariables>(CreateGalleryImageDocument);
};
export const CreateGenerationDocument = gql`
    mutation CreateGeneration($input: GenerationInput!) {
  createGeneration(input: $input)
}
    `;

export function useCreateGenerationMutation() {
  return Urql.useMutation<CreateGenerationMutation, CreateGenerationMutationVariables>(CreateGenerationDocument);
};
export const CreateMemberDocument = gql`
    mutation CreateMember($input: MemberInput!) {
  createMember(input: $input) {
    id
    fullName
    imageUrl
    description
    createdAt
  }
}
    `;

export function useCreateMemberMutation() {
  return Urql.useMutation<CreateMemberMutation, CreateMemberMutationVariables>(CreateMemberDocument);
};
export const CreateProjectDocument = gql`
    mutation CreateProject($input: ProjectInput!) {
  createProject(input: $input) {
    ...ProjectResponse
  }
}
    ${ProjectResponseFragmentDoc}`;

export function useCreateProjectMutation() {
  return Urql.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument);
};
export const DeleteGalleryImageDocument = gql`
    mutation DeleteGalleryImage($id: Int!) {
  deleteGalleryImage(id: $id)
}
    `;

export function useDeleteGalleryImageMutation() {
  return Urql.useMutation<DeleteGalleryImageMutation, DeleteGalleryImageMutationVariables>(DeleteGalleryImageDocument);
};
export const DeleteGenImageDocument = gql`
    mutation DeleteGenImage($genId: Int!, $imgId: Int!) {
  deleteGenImage(genId: $genId, imgId: $imgId)
}
    `;

export function useDeleteGenImageMutation() {
  return Urql.useMutation<DeleteGenImageMutation, DeleteGenImageMutationVariables>(DeleteGenImageDocument);
};
export const DeleteMemberDocument = gql`
    mutation DeleteMember($id: Int!) {
  deleteMember(id: $id)
}
    `;

export function useDeleteMemberMutation() {
  return Urql.useMutation<DeleteMemberMutation, DeleteMemberMutationVariables>(DeleteMemberDocument);
};
export const DeleteProjectDocument = gql`
    mutation DeleteProject($id: Int!) {
  deleteProject(id: $id)
}
    `;

export function useDeleteProjectMutation() {
  return Urql.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword {
  forgotPassword
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($options: AdminLogInput!) {
  login(options: $options) {
    errors {
      field
      message
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RemoveGenProjectDocument = gql`
    mutation RemoveGenProject($genId: Int!, $projId: Int!) {
  removeGenProject(genId: $genId, projId: $projId)
}
    `;

export function useRemoveGenProjectMutation() {
  return Urql.useMutation<RemoveGenProjectMutation, RemoveGenProjectMutationVariables>(RemoveGenProjectDocument);
};
export const UpdateAboutDocument = gql`
    mutation UpdateAbout($id: Int!, $input: AboutInput!) {
  updateAbout(id: $id, input: $input)
}
    `;

export function useUpdateAboutMutation() {
  return Urql.useMutation<UpdateAboutMutation, UpdateAboutMutationVariables>(UpdateAboutDocument);
};
export const UpdateContactsDocument = gql`
    mutation UpdateContacts($contacts: [MyContact!]!) {
  updateContacts(contacts: $contacts)
}
    `;

export function useUpdateContactsMutation() {
  return Urql.useMutation<UpdateContactsMutation, UpdateContactsMutationVariables>(UpdateContactsDocument);
};
export const UpdateGalleryImageDocument = gql`
    mutation UpdateGalleryImage($id: Int!, $input: GalleryInput!) {
  updateGalleryImage(id: $id, input: $input)
}
    `;

export function useUpdateGalleryImageMutation() {
  return Urql.useMutation<UpdateGalleryImageMutation, UpdateGalleryImageMutationVariables>(UpdateGalleryImageDocument);
};
export const UpdateGenerationDocument = gql`
    mutation UpdateGeneration($id: Int!, $input: GenerationInput!) {
  updateGeneration(id: $id, input: $input)
}
    `;

export function useUpdateGenerationMutation() {
  return Urql.useMutation<UpdateGenerationMutation, UpdateGenerationMutationVariables>(UpdateGenerationDocument);
};
export const UpdateLinksDocument = gql`
    mutation UpdateLinks($id: Int!, $input: SocialLinksInput!) {
  updateLinks(id: $id, input: $input)
}
    `;

export function useUpdateLinksMutation() {
  return Urql.useMutation<UpdateLinksMutation, UpdateLinksMutationVariables>(UpdateLinksDocument);
};
export const UpdateMemberDocument = gql`
    mutation UpdateMember($id: Int!, $input: MemberInput!) {
  updateMember(id: $id, input: $input) {
    id
    fullName
    description
    createdAt
  }
}
    `;

export function useUpdateMemberMutation() {
  return Urql.useMutation<UpdateMemberMutation, UpdateMemberMutationVariables>(UpdateMemberDocument);
};
export const UpdateProjectDocument = gql`
    mutation UpdateProject($id: Int!, $input: ProjectInput!) {
  updateProject(id: $id, input: $input) {
    id
    title
    description
    imageUrl
    body
    isPublished
  }
}
    `;

export function useUpdateProjectMutation() {
  return Urql.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument);
};
export const AdminProjectsDocument = gql`
    query AdminProjects {
  adminProjects {
    id
    title
    description
    imageUrl
    isPublished
    publishedAt
  }
}
    `;

export function useAdminProjectsQuery(options: Omit<Urql.UseQueryArgs<AdminProjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AdminProjectsQuery>({ query: AdminProjectsDocument, ...options });
};
export const ContactsDocument = gql`
    query Contacts {
  contacts {
    id
    contact
  }
}
    `;

export function useContactsQuery(options: Omit<Urql.UseQueryArgs<ContactsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ContactsQuery>({ query: ContactsDocument, ...options });
};
export const GalleryImagesDocument = gql`
    query GalleryImages {
  galleryImages {
    id
    imageUrl
    description
  }
}
    `;

export function useGalleryImagesQuery(options: Omit<Urql.UseQueryArgs<GalleryImagesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GalleryImagesQuery>({ query: GalleryImagesDocument, ...options });
};
export const GenerationsDocument = gql`
    query Generations {
  generations {
    ...Generation
  }
}
    ${GenerationFragmentDoc}`;

export function useGenerationsQuery(options: Omit<Urql.UseQueryArgs<GenerationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GenerationsQuery>({ query: GenerationsDocument, ...options });
};
export const GetAboutDocument = gql`
    query GetAbout {
  getAbout {
    id
    content
    imageUrl
  }
}
    `;

export function useGetAboutQuery(options: Omit<Urql.UseQueryArgs<GetAboutQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAboutQuery>({ query: GetAboutDocument, ...options });
};
export const IsLoggedInDocument = gql`
    query IsLoggedIn {
  isLoggedIn
}
    `;

export function useIsLoggedInQuery(options: Omit<Urql.UseQueryArgs<IsLoggedInQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<IsLoggedInQuery>({ query: IsLoggedInDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const ProjectDocument = gql`
    query Project($id: Int!) {
  project(id: $id) {
    error
    authorized
    project {
      id
      title
      description
      body
      imageUrl
      isPublished
      publishedAt
    }
  }
}
    `;

export function useProjectQuery(options: Omit<Urql.UseQueryArgs<ProjectQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectQuery>({ query: ProjectDocument, ...options });
};
export const ProjectsDocument = gql`
    query Projects($offset: Int!, $limit: Int!) {
  projects(offset: $offset, limit: $limit) {
    total
    hasMore
    projects {
      id
      title
      description
      imageUrl
      isPublished
      createdAt
    }
  }
}
    `;

export function useProjectsQuery(options: Omit<Urql.UseQueryArgs<ProjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectsQuery>({ query: ProjectsDocument, ...options });
};
export const SearchProjectsDocument = gql`
    query SearchProjects {
  searchProjects {
    id
    title
    description
  }
}
    `;

export function useSearchProjectsQuery(options: Omit<Urql.UseQueryArgs<SearchProjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchProjectsQuery>({ query: SearchProjectsDocument, ...options });
};
export const SocialLinksDocument = gql`
    query SocialLinks {
  socialLinks {
    id
    instagram
    facebook
    youtube
    iearnGlobal
  }
}
    `;

export function useSocialLinksQuery(options: Omit<Urql.UseQueryArgs<SocialLinksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SocialLinksQuery>({ query: SocialLinksDocument, ...options });
};
export const MembersDocument = gql`
    query Members {
  members {
    ...TableMember
  }
}
    ${TableMemberFragmentDoc}`;

export function useMembersQuery(options: Omit<Urql.UseQueryArgs<MembersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MembersQuery>({ query: MembersDocument, ...options });
};