import { GetServerSideProps } from "next";
import ResourcesList from "../../../components/pages/AdminPanel/ResourcesList";
import { redirectIfNotAdmin } from "../../../utils/redirect";

export const getServerSideProps: GetServerSideProps = redirectIfNotAdmin("/");

export default ResourcesList;
