export const TOASTS_OPTS = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const NOTIFICATION_MSGS = {
  SUCCESS: "Flow saved successfully!",
  FAILURE: "Failed to save the flow.",
  FAILED_CONDITION: "More than one node has empty target handles.",
};

export const PRO_OPTS = {
  hideAttribution: true,
};

export const initialNodes = [
  {
    id: "0",
    type: "message",
    position: { x: 118, y: 77 },
    data: { label: "message node" },
  },
];
let id = 1;
export const getId = () => `${id++}`;

export const makeUppserCaseFirstLetter = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
