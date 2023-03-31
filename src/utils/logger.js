import { createLogger, transports, format } from "winston";
import config from "../config/config.js";

const customLevels = {
	levels: {
		fatal: 0,
		error: 1,
		warning: 2,
		info: 3,
		http: 4,
		debug: 5,
	},
	colors: {
		fatal: "black",
		error: "red",
		warning: "yellow",
		info: "blue",
		http: "cyan",
		debug: "green",
	},
};

const logger = createLogger({
	levels: customLevels.levels,
});

const development = new transports.Console({
	level: "debug",
	format: format.combine(
		format.colorize({ colors: customLevels.colors }),
		format.simple()
	),
});

const production = new transports.Console({
	level: "info",
	format: format.combine(
		format.colorize({ colors: customLevels.colors }),
		format.simple()
	),
});

const file = new transports.File({
	level: "error",
	filename: "./errors.log",
	format: format.combine(
		format.label({ label: "Esto es un label Error" }),
		format.timestamp(),
		format.prettyPrint()
	),
});

logger.add(file);
if (config.entorno === "development") {
	logger.add(development);
} else {
	logger.add(production);
}

export default logger;
