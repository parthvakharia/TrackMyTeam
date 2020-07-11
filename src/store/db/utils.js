export const extractDataFromQuery = (qs) => {
  const data = [];
  qs.forEach((doc) =>
    data.push({
      docId: doc.id,
      ...doc.data(),
    })
  );
  return data;
};
