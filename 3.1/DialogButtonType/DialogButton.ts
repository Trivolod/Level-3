type DialogButtonType = "Yes" | "No";

interface FormButton {
  type: "Add" | "Remove" | "Buy";
}

type AnyButtonType = DialogButtonType | FormButton['type'];

type ConfirmationHandlingFormButton = FormButton & {
  onConfirm?: (result: DialogButtonType) => void;
};

function handleButtonClick(button: ConfirmationHandlingFormButton) {
  if (!button.onConfirm) {
    console.log(`${button.type}`);
    return;
  }

  const userChoice: DialogButtonType = "Yes";

  button.onConfirm(userChoice);
}

handleButtonClick({
  type: "Remove",
  onConfirm: (result) => {
    console.log(`${result}`);
  }
});