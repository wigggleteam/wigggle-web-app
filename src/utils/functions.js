export const getFileExtension = (fileName) => {
  return fileName.slice((fileName.lastIndexOf('.') - 1 >>> 0) + 2);
}