const { value, toCapitalizedValue, removeDir } = require("macrox");

const dirname = value.includes("/") ? value.split("/")[0] : "";
const capitalizedValue = value.includes("/") ? value.split("/")[1] : toCapitalizedValue(value);

removeDir(`./src/useCases/${dirname}/${capitalizedValue}`);
