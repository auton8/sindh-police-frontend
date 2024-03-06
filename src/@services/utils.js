import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const Toast = MySwal.mixin({
  target: '#myTest',
  closeOnClick: true,
  customClass: {
    container: {
      position: 'absolute',
      zIndex: 999999999999999,
    },
  },
  toast: true,
  position: 'top',

  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  showCloseButton: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

export const showMessage = (icon, message) => {
  Toast.fire({
    icon,
    title: message,
  });
};

export const sleep = (timeout) => {
  return new Promise((resolve) => setTimeout(() => {
    resolve(true)
  }, timeout))
};


//convert to excell column
export const convertToExcelColumnName = (columnIndex) => {
  let columnName = '';
  while (columnIndex > 0) {
    let modulo = (columnIndex - 1) % 26;
    columnName = String.fromCharCode(65 + modulo) + columnName;
    columnIndex = Math.floor((columnIndex - modulo) / 26);
  }
  return columnName;
};


export const CSV_DELIMETERS_CONST = [
  {
    id: 1,
    name: 'Comma Separated',
    value: ','
  },
  {
    id: 2,
    name: 'Pipe Delimeted',
    value: '|'
  },
  {
    id: 3,
    name: 'Tab Separated',
    value: '\t'
  },
]
export const DATABASE_TYPES_CONST = [
  {
    id: 1,
    title: 'SQL Server',
  },
  {
    id: 2,
    title: 'MySql',
  },
  {
    id: 3,
    title: 'MariaDB',
  },
  {
    id: 4,
    title: 'PostGresql',
  },
  {
    id: 5,
    title: 'MongoDB',
  },
];


export const CONST_DATA_SOURCES = [
  {
    id: 1,
    name: 'File',
    value: 'file',
  },
  {
    id: 2,
    name: 'Database Query',
    value: 'db-query',
  },
  {
    id: 3,
    name: 'URL',
    value: 'url',
  },
];

export const CSV_DELIMETERS_JSON = {
  1: ',',
  2: '|',
  3: '\t',

  'COMMA': ',',
  'PIPE': '|',
  'TAB': '\t',
}


export const TARGET_FILE_EXTENSIONS = [
  {
    id: 1,
    name: 'CSV',
    extension: '.csv'
  },
  {
    id: 2,
    name: 'TXT',
    extension: '.txt'
  },
]