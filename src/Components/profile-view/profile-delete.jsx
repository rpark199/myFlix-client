import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function ProfileDelete(username) {
    const [isDeleting, setIsDeleting] = useState(false);
  
    const handleDelete = async () => {
      username.onDelete(setIsDeleting);
    };
  
    return (
      <Button variant="danger" disabled={isDeleting} onClick={handleDelete}>
        {isDeleting ? "Deleting..." : "Delete Profile"}
      </Button>
    );
  }