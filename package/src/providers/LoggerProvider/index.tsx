import { ConsoleLogger, Logger, LogLevel } from "amazon-chime-sdk-js";
import React, { ReactNode, useContext } from "react";

const consoleLogger: Logger = new ConsoleLogger(
	"ChimeSDKReact",
	LogLevel.INFO
);
export const LoggerContext = React.createContext<Logger>(consoleLogger);

interface Props {
  logger: Logger;
  children: ReactNode
}

export const LoggerProvider = ({ logger, children } : Props) => {
	return (
		<LoggerContext.Provider value={logger}>{children}</LoggerContext.Provider>
	);
};

export const useLogger = (): Logger => {
	const logger = useContext(LoggerContext);
	return logger;
};
