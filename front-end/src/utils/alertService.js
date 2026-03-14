import Swal from "sweetalert2";

export const showSuccess = (message) => {
  return Swal.fire({
    icon: "success",
    text: message,
    confirmButtonColor: "#111827",
  });
};

export const showError = (message) => {
  return Swal.fire({
    icon: "error",
    text: message,
    confirmButtonColor: "#111827",
  });
};

export const showConfirm = async (message = "Are you sure?") => {
  const result = await Swal.fire({
    title: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#111827",
    cancelButtonColor: "#d1d5db",
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
    reverseButtons: true,
    focusCancel: true,
  });

  return result.isConfirmed;
};
