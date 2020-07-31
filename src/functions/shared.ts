const SMALL = 425;
const MEDIUM = 768;

enum DeviceSize {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

const getDevice = (): DeviceSize => {
  if (window.innerWidth <= SMALL) {
    return DeviceSize.SMALL;
  } else if (window.innerWidth <= MEDIUM) {
    return DeviceSize.MEDIUM;
  }
  return DeviceSize.LARGE;
};

const isDeviceSize = (deviceSize: DeviceSize): boolean => {
  return getDevice() === deviceSize;
};

export { DeviceSize, isDeviceSize };
