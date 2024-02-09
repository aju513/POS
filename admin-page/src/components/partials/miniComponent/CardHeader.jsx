import { ListAltOutlined } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

const CardHeader = ({ title }) => {
  return (
    <div className="card-header">
      <div className="d-flex justify-content-between">
        <h4>{title}</h4>
        <button className="btn theme-button">
          <Link>
            <ListAltOutlined />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default CardHeader;
