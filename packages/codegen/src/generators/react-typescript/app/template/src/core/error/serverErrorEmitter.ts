import {EventEmitter} from "@amplicode/react";
import {ServerErrorEvents} from "./ServerErrorEvents";

export const serverErrorEmitter = new EventEmitter<ServerErrorEvents>();