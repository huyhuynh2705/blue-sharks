export const getUserInformationFromStorage = () => {
  return JSON.parse(localStorage.getItem('profile'));
};

export const saveUserInformationToStorage = (profile) => {
  localStorage.setItem('profile', JSON.stringify(profile));
};

export const deleteUserInformationFromStorage = () => {
  localStorage.removeItem('profile');
};

export const sortMembers = (data, sort) => {
  const sortData = [...data];
  switch (sort) {
    case '':
      return data;
    case 'point':
      sortData.sort((a, b) => (a.point > b.point ? 1 : b.point > a.point ? -1 : 0));
      return sortData;
    case 'department':
      sortData.sort((a, b) => (a.department > b.department ? 1 : b.department > a.department ? -1 : 0));
      return sortData;
    case 'schoolYear':
      sortData.sort((a, b) => (a.schoolYear > b.schoolYear ? 1 : b.schoolYear > a.schoolYear ? -1 : 0));
      return sortData;
    case 'faculty':
      sortData.sort((a, b) => (a.faculty > b.faculty ? 1 : b.faculty > a.faculty ? -1 : 0));
      return sortData;
    default:
      return data;
  }
};
