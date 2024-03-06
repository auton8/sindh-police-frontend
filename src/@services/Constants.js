export const pollingTime = 10000

const tomorrowDate = () => {
  let currentDate = new Date();
  let tomorrowDate = new Date(currentDate);
  tomorrowDate.setDate(currentDate.getDate() + 1);
  return tomorrowDate
}

export const filterTime = {
  start: new Date('2022-11-01'),
  end: tomorrowDate(),
}

export default {

  // LIGHT SAIL
  // API_URL: 'http://13.251.39.7:3008' + '/api/', //STAGGING
  // PUBLIC_URL: 'http://13.251.39.7:3008' + '/public/', //STAGGING

  // AWS EC2 DOMAIN
  // API_URL: 'http://staging.auton8.io' + '/api/', //STAGGING (updated)
  // PUBLIC_URL: 'http://staging.auton8.io' + '/public/', //STAGGING (updated)
  // SOCKET_URL: "wss://dev.auton8.io:3006",
  // API_URL: 'https://dev.auton8.io' + '/api/', //dev  (updated)
  // PUBLIC_URL: 'https://dev.auton8.io' + '/public/', //dev (updated)

  API_URL: 'http://localhost:3008' + '/api/',
  PUBLIC_URL: 'http://localhost:3008' + '/public/',
  SOCKET_URL: "ws://localhost:3008",
  TKV: '619F20AbgLLkkLL100!@!$%!ZX!##$$',
  ALGO: 'aes256',
  COLORS: {
    RED: '',
    ORANGE: '',
    GREEN: '',
  },


  INIT_PERMISSIONS: {
    list_api: true,
    create_api: true,
    edit_api: true,
    delete_api: true,
    list_policy: true,
    create_policy: true,
    edit_policy: true,
    delete_policy: true,
    list_member: true,
    create_member: true,
    edit_member: true,
    delete_member: true,
    list_performance: true,
    create_performance: true,
    edit_performance: true,
    delete_performance: true,
    list_group: true,
    create_group: true,
    edit_group: true,
    delete_group: true,
    list_schedule: true,
    create_schedule: true,
    edit_schedule: true,
    delete_schedule: true,
    list_test: true,
    create_test: true,
    edit_test: true,
    delete_test: true,
    run_test: true,
    list_test_history: true,
    add_test_group: true,
    change_test_group: true,
    test_run_detail: true,

    list_rule: true,
    create_rule: true,
    edit_rule: true,
    delete_rule: true,

    list_migration: true,
    create_migration: true,
    edit_migration: true,
    delete_migration: true,
    execution_migration: true,
    parse_migration: true,
    switch_migration: true
  },

  INIT_PERMISSIONS_FALSE: {
    list_api: false,
    create_api: false,
    edit_api: false,
    delete_api: false,

    list_policy: false,
    create_policy: false,
    edit_policy: false,
    delete_policy: false,

    list_member: false,
    create_member: false,
    edit_member: false,
    delete_member: false,

    list_performance: false,
    create_performance: false,
    edit_performance: false,
    delete_performance: false,

    list_group: false,
    create_group: false,
    edit_group: false,
    delete_group: false,

    list_schedule: false,
    create_schedule: false,
    edit_schedule: false,
    delete_schedule: false,

    list_test: false,
    create_test: false,
    edit_test: false,
    delete_test: false,

    run_test: false,
    list_test_history: false,
    add_test_group: false,
    change_test_group: false,
    test_run_detail: false,

    list_rule: false,
    create_rule: false,
    edit_rule: false,
    delete_rule: false,

    list_migration: false,
    create_migration: false,
    edit_migration: false,
    delete_migration: false,
    execution_migration: false,
    parse_migration: false,
    switch_migration: false
  },

  PERMISSION_NAMES: {
    list_performance: 'View Performance Tests List',
    create_performance: 'Create New Performance Test',
    edit_performance: 'Edit Performance Test',
    delete_performance: 'Delete Performance Test',
    list_member: 'View Members List',
    create_member: 'Add New Member',
    edit_member: 'Edit Member',
    delete_member: 'Delete Member',
    list_policy: 'View Policies List',
    create_policy: 'Create New Policy',
    edit_policy: 'Edit Policy',
    delete_policy: 'Delete Policy',
    list_api: 'View Api Suites List',
    create_api: 'Create New Api Suite',
    edit_api: 'Edit Api Suite',
    delete_api: 'Delete Api Suite',
    list_group: 'View Group List',
    create_group: 'Create New Group',
    edit_group: 'Edit Group',
    delete_group: 'Delete Group',
    list_schedule: 'View Schedules List',
    create_schedule: 'Create New Schedule',
    edit_schedule: 'Edit Schedule',
    delete_schedule: 'Delete Schedule',
    list_test: 'List Tests',
    create_test: 'Create New Test',
    edit_test: 'Edit Test',
    delete_test: 'Delete Test',
    run_test: 'Run Test',
    list_test_history: 'View Test History',
    add_test_group: 'Add Test To Group',
    change_test_group: 'Change Test Group',
    test_run_detail: 'View Test Runs',

    list_rule: "List Rules",
    create_rule: "Create New Rule",
    edit_rule: "Edit Rule",
    delete_rule: "Delete Rule",

    list_migration: "List Migration Files",
    create_migration: "Create Migration File",
    edit_migration: "Edit Migration File",
    delete_migration: "Delete Migration File",
    execution_migration: "Run Migration File",
    parse_migration: "Parse Migration File",
    switch_migration: "Switch Migration File"
  },

  REGEXES_CONST: [
    {
      "id": 1,
      "name": "Digits - Whole Numbers",
      "pattern": '\\d+'
    },
    {
      "id": 2,
      "name": "Digits - Decimal Numbers",
      "pattern": '^\\d*\\.\\d+$'
    },
    {
      "id": 3,
      "name": "Digits - Whole + Decimal Numbers",
      "pattern": '\\d+'
    },
    {
      "id": 4,
      "name": "Digits - Negative, Positive Whole + Decimal Numbers",
      "pattern": '^-?\\d*(\\.\\d+)?$'
    },
    {
      "id": 5,
      "name": "Alphanumeric Characters - Alphanumeric without space",
      "pattern": '^[a-zA-Z0-9]*$'
    },
    {
      "id": 6,
      "name": "Alphanumeric Characters - Alphanumeric with space",
      "pattern": '^[a-zA-Z0-9 ]*$'
    },
    {
      "id": 7,
      "name": "Email - Common email Ids",
      "pattern": '^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6})*$'
    },
    {
      "id": 8,
      "name": "Email - Uncommon email ids",
      "pattern": '^([a-z0-9_\\.+\\-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$'
    },
    {
      "id": 9,
      "name": "Password Strength - Complex",
      "pattern": '(?=.*[0-9])(?=.*[!@#$%^&*()\\[\\]{}\\-_=~`|:;\\\\"\'<>,./?])(?=.*[a-z])(?=.*[A-Z])(?=.*).{8,}'
    },
    {
      "id": 10,
      "name": "Password Strength - Moderate",
      "pattern": '(?=.*[0-9])(?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}$'
    },
    {
      "id": 11,
      "name": "Username - Alphanumeric string that may include _ and – having a length of 3 to 16 characters",
      "pattern": '^[a-z0-9_-]{3,16}$'
    },
    {
      "id": 12,
      "name": "URL - Include http(s) Protocol",
      "pattern": 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#()?&//=]*)'
    },
    {
      "id": 13,
      "name": "URL - Protocol Optional",
      "pattern": '(https?:\\/\\/)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)'
    },
    {
      "id": 14,
      "name": "IP Address - IPv4 address",
      "pattern": '^(\\d{1,3}\\.){3}\\d{1,3}$'
    },
    {
      "id": 15,
      "name": "IP Address - IPv6 address",
      "pattern": '^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$'
    }
  ]
};

const currencyOption = [
  {
    "label": "$",
    "name": "US Dollar",
    "symbol_native": "$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "USD",
    "name_plural": "US dollars"
  },
  {
    "label": "CA$",
    "name": "Canadian Dollar",
    "symbol_native": "$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "CAD",
    "name_plural": "Canadian dollars"
  },
  {
    "label": "€",
    "name": "Euro",
    "symbol_native": "€",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "EUR",
    "name_plural": "euros"
  },
  {
    "label": "AED",
    "name": "United Arab Emirates Dirham",
    "symbol_native": "د.إ.‏",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "AED",
    "name_plural": "UAE dirhams"
  },
  {
    "label": "Af",
    "name": "Afghan Afghani",
    "symbol_native": "؋",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "AFN",
    "name_plural": "Afghan Afghanis"
  },
  {
    "label": "ALL",
    "name": "Albanian Lek",
    "symbol_native": "Lek",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "ALL",
    "name_plural": "Albanian lekë"
  },
  {
    "label": "AMD",
    "name": "Armenian Dram",
    "symbol_native": "դր.",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "AMD",
    "name_plural": "Armenian drams"
  },
  {
    "label": "AR$",
    "name": "Argentine Peso",
    "symbol_native": "$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "ARS",
    "name_plural": "Argentine pesos"
  },
  {
    "label": "AU$",
    "name": "Australian Dollar",
    "symbol_native": "$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "AUD",
    "name_plural": "Australian dollars"
  },
  {
    "label": "man.",
    "name": "Azerbaijani Manat",
    "symbol_native": "ман.",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "AZN",
    "name_plural": "Azerbaijani manats"
  },
  {
    "label": "KM",
    "name": "Bosnia-Herzegovina Convertible Mark",
    "symbol_native": "KM",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "BAM",
    "name_plural": "Bosnia-Herzegovina convertible marks"
  },
  {
    "label": "Tk",
    "name": "Bangladeshi Taka",
    "symbol_native": "৳",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "BDT",
    "name_plural": "Bangladeshi takas"
  },
  {
    "label": "BGN",
    "name": "Bulgarian Lev",
    "symbol_native": "лв.",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "BGN",
    "name_plural": "Bulgarian leva"
  },
  {
    "label": "BD",
    "name": "Bahraini Dinar",
    "symbol_native": "د.ب.‏",
    "decimal_digits": 3,
    "rounding": 0,
    "code": "BHD",
    "name_plural": "Bahraini dinars"
  },
  {
    "label": "FBu",
    "name": "Burundian Franc",
    "symbol_native": "FBu",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "BIF",
    "name_plural": "Burundian francs"
  },
  {
    "label": "BN$",
    "name": "Brunei Dollar",
    "symbol_native": "$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "BND",
    "name_plural": "Brunei dollars"
  },
  {
    "label": "Bs",
    "name": "Bolivian Boliviano",
    "symbol_native": "Bs",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "BOB",
    "name_plural": "Bolivian bolivianos"
  },
  {
    "label": "R$",
    "name": "Brazilian Real",
    "symbol_native": "R$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "BRL",
    "name_plural": "Brazilian reals"
  },
  {
    "label": "BWP",
    "name": "Botswanan Pula",
    "symbol_native": "P",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "BWP",
    "name_plural": "Botswanan pulas"
  },
  {
    "label": "Br",
    "name": "Belarusian Ruble",
    "symbol_native": "руб.",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "BYN",
    "name_plural": "Belarusian rubles"
  },
  {
    "label": "BZ$",
    "name": "Belize Dollar",
    "symbol_native": "$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "BZD",
    "name_plural": "Belize dollars"
  }, {
    "label": "CDF",
    "name": "Congolese Franc",
    "symbol_native": "FrCD",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "CDF",
    "name_plural": "Congolese francs"
  },
  {
    "label": "CHF",
    "name": "Swiss Franc",
    "symbol_native": "CHF",
    "decimal_digits": 2,
    "rounding": 0.05,
    "code": "CHF",
    "name_plural": "Swiss francs"
  },
  {
    "label": "CL$",
    "name": "Chilean Peso",
    "symbol_native": "$",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "CLP",
    "name_plural": "Chilean pesos"
  },
  {
    "label": "CN¥",
    "name": "Chinese Yuan",
    "symbol_native": "CN¥",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "CNY",
    "name_plural": "Chinese yuan"
  },
]

const dateAndTime = [
  {
    label: "Wednesday,March 7,2021",
    value: "dddd, MMMM D, YYYY",
    format_id: 1
  },
  {
    label: "Wednesday",
    value: "dddd",
    format_id: 2
  },
  {
    label: "Wed",
    value: "ddd",
    format_id: 3
  },
  {
    label: "3/7/2021",
    value: 'MM/DD/YYYY',
    format_id: 4
  },
  {
    label: "3/7/01 12 00 am",
    value: "M/D/YY h mm a",
    format_id: 5
  },
  {
    label: "7-Mar",
    value: "D-MMM",
    format_id: 6
  },
  {
    label: "7-March-2021",
    value: "DD-MMMM-YYYY",
    format_id: 7
  }
]

export const formatthingRule = [
  {
    formatType: 1,
    label: "General",
    value: "General",
    field: [
      {
        textLabel: "General format have no specific number format",
        textType: 1,
        type: "only-text",
      }
    ]
  },
  {
    formatType: 2,
    label: "Number",
    value: "number",
    field: [
      {
        name: "decimal_places",
        type: "number",
        label: "Decimal Places",
        value: "1",
      },
      {
        label: "Use 1000 Separater",
        value: false,
        type: "checkbox",
        name: "use_1000_separator"
      },
      {
        type: "only-text",
        textType: 2,
        name: "decimal_places",
      }
    ]
  },
  {
    formatType: 3,
    label: "Currency",
    value: 'currency',
    field: [
      {
        name: "decimal_places",
        type: "number",
        label: "Decimal Places",
        value: "1",
      },
      {
        name: "currency_symbol",
        type: "dropdown",
        label: "Type",
        value: "",
        freeSolo: true,
        option: currencyOption
      },
      {
        type: "only-text",
        textType: 3,
        name: "currency"
      }
    ]
  },
  {
    formatType: 4,
    label: "Date Time",
    value: "date time",
    field: [
      {
        name: "source_format",
        type: "datetime1",
        label: "Source Format",
        value: "",
        freeSolo: true,
        option: dateAndTime,
        format_id: "",
        format_value: ""
      },
      {
        name: "target_format",
        type: "datetime2",
        label: "Target Format",
        value: "",
        freeSolo: true,
        option: dateAndTime,
        format_id: "",
        format_value: ""
      }
    ]
  },
  {
    formatType: 5,
    label: "Text",
    value: "text",
    field: [
      {
        name: "format",
        type: "text",
        label: "Text Format",
        value: "",
      },
      {
        type: "only-text",
        textType: 5,
        name: "string"
      }

    ]
  },
]

export const TAKE_SCREEN_SHOTS_OPTIONS = {
  'ALL': 1,
  'PASSED': 2,
  'FAILED': 3,
  'NONE': 4
}
