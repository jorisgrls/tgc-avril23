export const convertStatus = (status: string) => {
  switch (status) {
    case "VALIDATED":
      return "Validée";
    case "PENDING":
      return "En attente";
    case "REJECTED":
      return "Rejetée";
    default:
      return status;
  }
};
