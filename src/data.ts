import React from "react";
type inputType = {
  logo: string;
  brand: string;
  date: string;
  time: string;
  duration?: string;
  departure?: string;
  arrival?: string;
  status: string;
  price: string | number;
};
export const cardData: inputType[] = [
  {
    logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
    brand: "VietNamAirlines",
    date: " 2024-03-25",
    time: "16:20 PM",
    duration: "1h30m",
    departure: "HoChiMinh",
    arrival: "HaNoi",
    status: "available",
    price: 3500000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: " 2024-03-25",
    time: "17:20 PM",
    duration: "1h30m",
    departure: "HoChiMinh",
    arrival: "HaNoi",
    status: "sold",
    price: 2000000,
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Bamboo_Airways_Logo_QH-BAV.png/799px-Bamboo_Airways_Logo_QH-BAV.png",
    brand: "BambooAirways",
    date: " 2024-03-26",
    time: "17:20 PM",
    duration: "1h30m",
    departure: "HoChiMinh",
    arrival: "HaNoi",
    status: "sold",
    price: 2200000,
  },
  {
    logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
    brand: "VietNamAirlines",
    date: "2024-31-03",
    time: "09:45 AM",
    duration: "1h30m",
    departure: "HoChiMinh",
    arrival: "HaNoi",
    status: "available",
    price: 3200000,
  },
  {
    logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
    brand: "VietNamAirlines",
    date: "2024-01-04",
    time: "12:30 PM",
    duration: "1h30m",
    departure: "HaNoi",
    arrival: "Vinh",
    status: "available",
    price: 2000000,
  },
  {
    logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
    brand: "VietNamAirlines",
    date: "2024-01-04",
    time: "12:30 PM",
    duration: "1h30m",
    departure: "HaNoi",
    arrival: "Vinh",
    status: "sold",
    price: 1800000,
  },
  {
    logo: "https://freepngdesign.com/content/uploads/images/p19-34-bamboo-airways-7937733795.png",
    brand: "BambooAirways",
    date: "2024-01-04",
    time: "12:30 PM",
    duration: "1h30m",
    departure: "HaNoi",
    arrival: "Vinh",
    status: "sold",
    price: 1500000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-01-04",
    time: "12:30 PM",
    duration: "1h30m",
    departure: "HaNoi",
    arrival: "Vinh",
    status: "available",
    price: 1650000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-01-04",
    time: "12:30 PM",
    duration: "1h30m",
    departure: "HaNoi",
    arrival: "Vinh",
    status: "available",
    price: 1800000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-01-04",
    time: "12:30 PM",
    duration: "1h30m",
    departure: "HaNoi",
    arrival: "Vinh",
    status: "available",
    price: 1800000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-01-04",
    time: "12:30 PM",
    duration: "1h30m",
    departure: "HaNoi",
    arrival: "Vinh",
    status: "available",
    price: 1800000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-01-04",
    time: "12:30 PM",
    duration: "1h30m",
    departure: "HaNoi",
    arrival: "Vinh",
    status: "sold",
    price: 1800000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-01-04",
    time: "12:30 PM",
    duration: "1h30m",
    departure: "HaNoi",
    arrival: "Vinh",
    status: "available",
    price: 1800000,
  },
  {
    logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
    brand: "VietNamAirlines",
    date: "2024-01-04",
    time: "12:30 PM",
    duration: "1h30m",
    departure: "HaNoi",
    arrival: "Vinh",
    status: "available",
    price: 4000000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-01-04",
    time: "12:30 PM",
    duration: "1h30m",
    departure: "HaNoi",
    arrival: "Vinh",
    status: "sold",
    price: 1500000,
  },

  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Bamboo_Airways_Logo_QH-BAV.png/799px-Bamboo_Airways_Logo_QH-BAV.png",
    brand: "BambooAirways",
    date: "2024-02-04",
    time: "14:15 PM",
    duration: "1h30m",
    departure: "HoChiMinh",
    arrival: "DaNang",
    status: "available",
    price: 2400000,
  },
  {
    logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
    brand: "VietNamAirlines",
    date: "2024-03-04",
    time: "08:00 AM",
    duration: "1h30m",
    departure: "DaNang",
    arrival: "ThanhHoa",
    status: "sold",
    price: 2000000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-04-04",
    time: "17:00 PM",
    duration: "1h30m",
    departure: "HoChiMinh",
    arrival: "QuangBinh",
    status: "available",
    price: 2600000,
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Bamboo_Airways_Logo_QH-BAV.png/799px-Bamboo_Airways_Logo_QH-BAV.png",
    brand: "BambooAirways",
    date: "2024-05-04",
    time: "11:20 AM",
    duration: "1h30m",
    departure: "HaNoi",
    arrival: "PhuQuoc",
    status: "available",
    price: 3000000,
  },
  {
    logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
    brand: "VietNamAirlines",
    date: "2024-06-04",
    time: "15:40 PM",
    duration: "1h30m",
    departure: "Vinh",
    arrival: "HoChiMinh",
    status: "sold",
    price: 2200000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-07-04",
    time: "10:15 AM",
    duration: "1h30m",
    departure: "ThanhHoa",
    arrival: "HaNoi",
    status: "available",
    price: 2800000,
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Bamboo_Airways_Logo_QH-BAV.png/799px-Bamboo_Airways_Logo_QH-BAV.png",
    brand: "BambooAirways",
    date: "2024-08-04",
    time: "13:25 PM",
    duration: "1h30m",
    departure: "QuangBinh",
    arrival: "DaNang",
    status: "available",
    price: 2300000,
  },
  {
    logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
    brand: "VietNamAirlines",
    date: "2024-09-04",
    time: "16:55 PM",
    duration: "1h30m",
    departure: "PhuQuoc",
    arrival: "HaNoi",
    status: "sold",
    price: 2700000,
  },
  {
    logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
    brand: "VietNamAirlines",
    date: "2024-27-03",
    time: "10:00 AM",
    duration: "1h30m",
    departure: "HaNoi",
    arrival: "Vinh",
    status: "available",
    price: 3000000,
  },
  {
    logo: "https://i.ibb.co/GM569xh/vietjet-01.png",
    brand: "VietJet",
    date: "2024-28-03",
    time: "14:30 PM",
    duration: "1h30m",
    departure: "HoChiMinh",
    arrival: "DaNang",
    status: "available",
    price: 2500000,
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Bamboo_Airways_Logo_QH-BAV.png/799px-Bamboo_Airways_Logo_QH-BAV.png",
    brand: "BambooAirways",
    date: "2024-29-03",
    time: "11:45 AM",
    duration: "1h30m",
    departure: "ThanhHoa",
    arrival: "QuangBinh",
    status: "sold",
    price: 1800000,
  },
  {
    logo: "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
    brand: "VietNamAirlines",
    date: "2024-30-03",
    time: "08:00 AM",
    duration: "1h30m",
    departure: "PhuQuoc",
    arrival: "HaNoi",
    status: "available",
    price: 2800000,
  },
];

export const countryData = [
  {
    "name": "Afghanistan",
    "code": "AF"
  },
  {
    "name": "Aland Islands",
    "code": "AX"
  },
  {
    "name": "Albania",
    "code": "AL"
  },
  {
    "name": "Algeria",
    "code": "DZ"
  },
  {
    "name": "American Samoa",
    "code": "AS"
  },
  {
    "name": "Andorra",
    "code": "AD"
  },
  {
    "name": "Angola",
    "code": "AO"
  },
  {
    "name": "Anguilla",
    "code": "AI"
  },
  {
    "name": "Antarctica",
    "code": "AQ"
  },
  {
    "name": "Antigua and Barbuda",
    "code": "AG"
  },
  {
    "name": "Argentina",
    "code": "AR"
  },
  {
    "name": "Armenia",
    "code": "AM"
  },
  {
    "name": "Aruba",
    "code": "AW"
  },
  {
    "name": "Australia",
    "code": "AU"
  },
  {
    "name": "Austria",
    "code": "AT"
  },
  {
    "name": "Azerbaijan",
    "code": "AZ"
  },
  {
    "name": "Bahrain",
    "code": "BH"
  },
  {
    "name": "Bangladesh",
    "code": "BD"
  },
  {
    "name": "Barbados",
    "code": "BB"
  },
  {
    "name": "Belarus",
    "code": "BY"
  },
  {
    "name": "Belgium",
    "code": "BE"
  },
  {
    "name": "Belize",
    "code": "BZ"
  },
  {
    "name": "Benin",
    "code": "BJ"
  },
  {
    "name": "Bermuda",
    "code": "BM"
  },
  {
    "name": "Bhutan",
    "code": "BT"
  },
  {
    "name": "Bolivia",
    "code": "BO"
  },
  {
    "name": "Bonaire, Sint Eustatius and Saba",
    "code": "BQ"
  },
  {
    "name": "Bosnia and Herzegovina",
    "code": "BA"
  },
  {
    "name": "Botswana",
    "code": "BW"
  },
  {
    "name": "Bouvet Island",
    "code": "BV"
  },
  {
    "name": "Brazil",
    "code": "BR"
  },
  {
    "name": "British Indian Ocean Territory",
    "code": "IO"
  },
  {
    "name": "Brunei",
    "code": "BN"
  },
  {
    "name": "Bulgaria",
    "code": "BG"
  },
  {
    "name": "Burkina Faso",
    "code": "BF"
  },
  {
    "name": "Burundi",
    "code": "BI"
  },
  {
    "name": "Cambodia",
    "code": "KH"
  },
  {
    "name": "Cameroon",
    "code": "CM"
  },
  {
    "name": "Canada",
    "code": "CA"
  },
  {
    "name": "Cape Verde",
    "code": "CV"
  },
  {
    "name": "Cayman Islands",
    "code": "KY"
  },
  {
    "name": "Central African Republic",
    "code": "CF"
  },
  {
    "name": "Chad",
    "code": "TD"
  },
  {
    "name": "Chile",
    "code": "CL"
  },
  {
    "name": "China",
    "code": "CN"
  },
  {
    "name": "Christmas Island",
    "code": "CX"
  },
  {
    "name": "Cocos (Keeling) Islands",
    "code": "CC"
  },
  {
    "name": "Colombia",
    "code": "CO"
  },
  {
    "name": "Comoros",
    "code": "KM"
  },
  {
    "name": "Congo",
    "code": "CG"
  },
  {
    "name": "Cook Islands",
    "code": "CK"
  },
  {
    "name": "Costa Rica",
    "code": "CR"
  },
  {
    "name": "Cote D'Ivoire (Ivory Coast)",
    "code": "CI"
  },
  {
    "name": "Croatia",
    "code": "HR"
  },
  {
    "name": "Cuba",
    "code": "CU"
  },
  {
    "name": "Curaçao",
    "code": "CW"
  },
  {
    "name": "Cyprus",
    "code": "CY"
  },
  {
    "name": "Czech Republic",
    "code": "CZ"
  },
  {
    "name": "Democratic Republic of the Congo",
    "code": "CD"
  },
  {
    "name": "Denmark",
    "code": "DK"
  },
  {
    "name": "Djibouti",
    "code": "DJ"
  },
  {
    "name": "Dominica",
    "code": "DM"
  },
  {
    "name": "Dominican Republic",
    "code": "DO"
  },
  {
    "name": "Ecuador",
    "code": "EC"
  },
  {
    "name": "Egypt",
    "code": "EG"
  },
  {
    "name": "El Salvador",
    "code": "SV"
  },
  {
    "name": "Equatorial Guinea",
    "code": "GQ"
  },
  {
    "name": "Eritrea",
    "code": "ER"
  },
  {
    "name": "Estonia",
    "code": "EE"
  },
  {
    "name": "Eswatini",
    "code": "SZ"
  },
  {
    "name": "Ethiopia",
    "code": "ET"
  },
  {
    "name": "Falkland Islands",
    "code": "FK"
  },
  {
    "name": "Faroe Islands",
    "code": "FO"
  },
  {
    "name": "Fiji Islands",
    "code": "FJ"
  },
  {
    "name": "Finland",
    "code": "FI"
  },
  {
    "name": "France",
    "code": "FR"
  },
  {
    "name": "French Guiana",
    "code": "GF"
  },
  {
    "name": "French Polynesia",
    "code": "PF"
  },
  {
    "name": "French Southern Territories",
    "code": "TF"
  },
  {
    "name": "Gabon",
    "code": "GA"
  },
  {
    "name": "Gambia The",
    "code": "GM"
  },
  {
    "name": "Georgia",
    "code": "GE"
  },
  {
    "name": "Germany",
    "code": "DE"
  },
  {
    "name": "Ghana",
    "code": "GH"
  },
  {
    "name": "Gibraltar",
    "code": "GI"
  },
  {
    "name": "Greece",
    "code": "GR"
  },
  {
    "name": "Greenland",
    "code": "GL"
  },
  {
    "name": "Grenada",
    "code": "GD"
  },
  {
    "name": "Guadeloupe",
    "code": "GP"
  },
  {
    "name": "Guam",
    "code": "GU"
  },
  {
    "name": "Guatemala",
    "code": "GT"
  },
  {
    "name": "Guernsey and Alderney",
    "code": "GG"
  },
  {
    "name": "Guinea",
    "code": "GN"
  },
  {
    "name": "Guinea-Bissau",
    "code": "GW"
  },
  {
    "name": "Guyana",
    "code": "GY"
  },
  {
    "name": "Haiti",
    "code": "HT"
  },
  {
    "name": "Heard Island and McDonald Islands",
    "code": "HM"
  },
  {
    "name": "Honduras",
    "code": "HN"
  },
  {
    "name": "Hong Kong S.A.R.",
    "code": "HK"
  },
  {
    "name": "Hungary",
    "code": "HU"
  },
  {
    "name": "Iceland",
    "code": "IS"
  },
  {
    "name": "India",
    "code": "IN"
  },
  {
    "name": "Indonesia",
    "code": "ID"
  },
  {
    "name": "Iran",
    "code": "IR"
  },
  {
    "name": "Iraq",
    "code": "IQ"
  },
  {
    "name": "Ireland",
    "code": "IE"
  },
  {
    "name": "Israel",
    "code": "IL"
  },
  {
    "name": "Italy",
    "code": "IT"
  },
  {
    "name": "Jamaica",
    "code": "JM"
  },
  {
    "name": "Japan",
    "code": "JP"
  },
  {
    "name": "Jersey",
    "code": "JE"
  },
  {
    "name": "Jordan",
    "code": "JO"
  },
  {
    "name": "Kazakhstan",
    "code": "KZ"
  },
  {
    "name": "Kenya",
    "code": "KE"
  },
  {
    "name": "Kiribati",
    "code": "KI"
  },
  {
    "name": "Kosovo",
    "code": "XK"
  },
  {
    "name": "Kuwait",
    "code": "KW"
  },
  {
    "name": "Kyrgyzstan",
    "code": "KG"
  },
  {
    "name": "Laos",
    "code": "LA"
  },
  {
    "name": "Latvia",
    "code": "LV"
  },
  {
    "name": "Lebanon",
    "code": "LB"
  },
  {
    "name": "Lesotho",
    "code": "LS"
  },
  {
    "name": "Liberia",
    "code": "LR"
  },
  {
    "name": "Libya",
    "code": "LY"
  },
  {
    "name": "Liechtenstein",
    "code": "LI"
  },
  {
    "name": "Lithuania",
    "code": "LT"
  },
  {
    "name": "Luxembourg",
    "code": "LU"
  },
  {
    "name": "Macau S.A.R.",
    "code": "MO"
  },
  {
    "name": "Madagascar",
    "code": "MG"
  },
  {
    "name": "Malawi",
    "code": "MW"
  },
  {
    "name": "Malaysia",
    "code": "MY"
  },
  {
    "name": "Maldives",
    "code": "MV"
  },
  {
    "name": "Mali",
    "code": "ML"
  },
  {
    "name": "Malta",
    "code": "MT"
  },
  {
    "name": "Man (Isle of)",
    "code": "IM"
  },
  {
    "name": "Marshall Islands",
    "code": "MH"
  },
  {
    "name": "Martinique",
    "code": "MQ"
  },
  {
    "name": "Mauritania",
    "code": "MR"
  },
  {
    "name": "Mauritius",
    "code": "MU"
  },
  {
    "name": "Mayotte",
    "code": "YT"
  },
  {
    "name": "Mexico",
    "code": "MX"
  },
  {
    "name": "Micronesia",
    "code": "FM"
  },
  {
    "name": "Moldova",
    "code": "MD"
  },
  {
    "name": "Monaco",
    "code": "MC"
  },
  {
    "name": "Mongolia",
    "code": "MN"
  },
  {
    "name": "Montenegro",
    "code": "ME"
  },
  {
    "name": "Montserrat",
    "code": "MS"
  },
  {
    "name": "Morocco",
    "code": "MA"
  },
  {
    "name": "Mozambique",
    "code": "MZ"
  },
  {
    "name": "Myanmar",
    "code": "MM"
  },
  {
    "name": "Namibia",
    "code": "NA"
  },
  {
    "name": "Nauru",
    "code": "NR"
  },
  {
    "name": "Nepal",
    "code": "NP"
  },
  {
    "name": "Netherlands",
    "code": "NL"
  },
  {
    "name": "New Caledonia",
    "code": "NC"
  },
  {
    "name": "New Zealand",
    "code": "NZ"
  },
  {
    "name": "Nicaragua",
    "code": "NI"
  },
  {
    "name": "Niger",
    "code": "NE"
  },
  {
    "name": "Nigeria",
    "code": "NG"
  },
  {
    "name": "Niue",
    "code": "NU"
  },
  {
    "name": "Norfolk Island",
    "code": "NF"
  },
  {
    "name": "North Korea",
    "code": "KP"
  },
  {
    "name": "North Macedonia",
    "code": "MK"
  },
  {
    "name": "Northern Mariana Islands",
    "code": "MP"
  },
  {
    "name": "Norway",
    "code": "NO"
  },
  {
    "name": "Oman",
    "code": "OM"
  },
  {
    "name": "Pakistan",
    "code": "PK"
  },
  {
    "name": "Palau",
    "code": "PW"
  },
  {
    "name": "Palestinian Territory Occupied",
    "code": "PS"
  },
  {
    "name": "Panama",
    "code": "PA"
  },
  {
    "name": "Papua New Guinea",
    "code": "PG"
  },
  {
    "name": "Paraguay",
    "code": "PY"
  },
  {
    "name": "Peru",
    "code": "PE"
  },
  {
    "name": "Philippines",
    "code": "PH"
  },
  {
    "name": "Pitcairn Island",
    "code": "PN"
  },
  {
    "name": "Poland",
    "code": "PL"
  },
  {
    "name": "Portugal",
    "code": "PT"
  },
  {
    "name": "Puerto Rico",
    "code": "PR"
  },
  {
    "name": "Qatar",
    "code": "QA"
  },
  {
    "name": "Reunion",
    "code": "RE"
  },
  {
    "name": "Romania",
    "code": "RO"
  },
  {
    "name": "Russia",
    "code": "RU"
  },
  {
    "name": "Rwanda",
    "code": "RW"
  },
  {
    "name": "Saint Helena",
    "code": "SH"
  },
  {
    "name": "Saint Kitts and Nevis",
    "code": "KN"
  },
  {
    "name": "Saint Lucia",
    "code": "LC"
  },
  {
    "name": "Saint Pierre and Miquelon",
    "code": "PM"
  },
  {
    "name": "Saint Vincent and the Grenadines",
    "code": "VC"
  },
  {
    "name": "Saint-Barthelemy",
    "code": "BL"
  },
  {
    "name": "Saint-Martin (French part)",
    "code": "MF"
  },
  {
    "name": "Samoa",
    "code": "WS"
  },
  {
    "name": "San Marino",
    "code": "SM"
  },
  {
    "name": "Sao Tome and Principe",
    "code": "ST"
  },
  {
    "name": "Saudi Arabia",
    "code": "SA"
  },
  {
    "name": "Senegal",
    "code": "SN"
  },
  {
    "name": "Serbia",
    "code": "RS"
  },
  {
    "name": "Seychelles",
    "code": "SC"
  },
  {
    "name": "Sierra Leone",
    "code": "SL"
  },
  {
    "name": "Singapore",
    "code": "SG"
  },
  {
    "name": "Sint Maarten (Dutch part)",
    "code": "SX"
  },
  {
    "name": "Slovakia",
    "code": "SK"
  },
  {
    "name": "Slovenia",
    "code": "SI"
  },
  {
    "name": "Solomon Islands",
    "code": "SB"
  },
  {
    "name": "Somalia",
    "code": "SO"
  },
  {
    "name": "South Africa",
    "code": "ZA"
  },
  {
    "name": "South Georgia",
    "code": "GS"
  },
  {
    "name": "South Korea",
    "code": "KR"
  },
  {
    "name": "South Sudan",
    "code": "SS"
  },
  {
    "name": "Spain",
    "code": "ES"
  },
  {
    "name": "Sri Lanka",
    "code": "LK"
  },
  {
    "name": "Sudan",
    "code": "SD"
  },
  {
    "name": "Suriname",
    "code": "SR"
  },
  {
    "name": "Svalbard and Jan Mayen Islands",
    "code": "SJ"
  },
  {
    "name": "Sweden",
    "code": "SE"
  },
  {
    "name": "Switzerland",
    "code": "CH"
  },
  {
    "name": "Syria",
    "code": "SY"
  },
  {
    "name": "Taiwan",
    "code": "TW"
  },
  {
    "name": "Tajikistan",
    "code": "TJ"
  },
  {
    "name": "Tanzania",
    "code": "TZ"
  },
  {
    "name": "Thailand",
    "code": "TH"
  },
  {
    "name": "The Bahamas",
    "code": "BS"
  },
  {
    "name": "Timor-Leste",
    "code": "TL"
  },
  {
    "name": "Togo",
    "code": "TG"
  },
  {
    "name": "Tokelau",
    "code": "TK"
  },
  {
    "name": "Tonga",
    "code": "TO"
  },
  {
    "name": "Trinidad and Tobago",
    "code": "TT"
  },
  {
    "name": "Tunisia",
    "code": "TN"
  },
  {
    "name": "Turkey",
    "code": "TR"
  },
  {
    "name": "Turkmenistan",
    "code": "TM"
  },
  {
    "name": "Turks and Caicos Islands",
    "code": "TC"
  },
  {
    "name": "Tuvalu",
    "code": "TV"
  },
  {
    "name": "Uganda",
    "code": "UG"
  },
  {
    "name": "Ukraine",
    "code": "UA"
  },
  {
    "name": "United Arab Emirates",
    "code": "AE"
  },
  {
    "name": "United Kingdom",
    "code": "GB"
  },
  {
    "name": "United States",
    "code": "US"
  },
  {
    "name": "United States Minor Outlying Islands",
    "code": "UM"
  },
  {
    "name": "Uruguay",
    "code": "UY"
  },
  {
    "name": "Uzbekistan",
    "code": "UZ"
  },
  {
    "name": "Vanuatu",
    "code": "VU"
  },
  {
    "name": "Vatican City State (Holy See)",
    "code": "VA"
  },
  {
    "name": "Venezuela",
    "code": "VE"
  },
  {
    "name": "Vietnam",
    "code": "VN"
  },
  {
    "name": "Virgin Islands (British)",
    "code": "VG"
  },
  {
    "name": "Virgin Islands (US)",
    "code": "VI"
  },
  {
    "name": "Wallis and Futuna Islands",
    "code": "WF"
  },
  {
    "name": "Western Sahara",
    "code": "EH"
  },
  {
    "name": "Yemen",
    "code": "YE"
  },
  {
    "name": "Zambia",
    "code": "ZM"
  },
  {
    "name": "Zimbabwe",
    "code": "ZW"
  }
]
