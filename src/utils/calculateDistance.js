export const calculateDistance = (hands) => {
  if (!hands || hands.length < 2) return;
  const wrist = hands[0].keypoints.find((prop) => prop.name === "wrist");
  const middleFingerTip = hands[0].keypoints.find(
    (prop) => prop.name === "middle_finger_tip"
  );
  const size = Math.abs(wrist.y - middleFingerTip.y);
  const distance = Math.abs(hands[0].keypoints[0].x - hands[1].keypoints[0].x);
  const age = Math.max(Math.round((distance - 400) / 20 + 3), 3);
  return age;
};
