import React from "react";
import { Helmet } from "react-helmet";

const Breadcrumb = ({ title }) => {
  return (
    <>
      <Helmet>
        <title>{title} | Website</title>
      </Helmet>
      <h1 class="mt-4">{title}</h1>
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">{title}</li>
        <li class="breadcrumb-item " aria-current="page">
          {title}
        </li>
      </ol>
    </>
  );
};

export default Breadcrumb;
