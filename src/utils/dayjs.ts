import "dayjs/locale/id";
import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(CustomParseFormat);
dayjs.locale("id");

const d = dayjs;
export default d;
