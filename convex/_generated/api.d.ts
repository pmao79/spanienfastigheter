/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as activity from "../activity.js";
import type * as admin from "../admin.js";
import type * as adminProperties from "../adminProperties.js";
import type * as communications from "../communications.js";
import type * as crons from "../crons.js";
import type * as dashboard from "../dashboard.js";
import type * as dealChecklists from "../dealChecklists.js";
import type * as deals from "../deals.js";
import type * as documents from "../documents.js";
import type * as emailTemplates from "../emailTemplates.js";
import type * as leads from "../leads.js";
import type * as lib_dealChecklists from "../lib/dealChecklists.js";
import type * as migrations from "../migrations.js";
import type * as properties from "../properties.js";
import type * as regions from "../regions.js";
import type * as sync from "../sync.js";
import type * as tasks from "../tasks.js";
import type * as users from "../users.js";
import type * as viewingReports from "../viewingReports.js";
import type * as viewings from "../viewings.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  activity: typeof activity;
  admin: typeof admin;
  adminProperties: typeof adminProperties;
  communications: typeof communications;
  crons: typeof crons;
  dashboard: typeof dashboard;
  dealChecklists: typeof dealChecklists;
  deals: typeof deals;
  documents: typeof documents;
  emailTemplates: typeof emailTemplates;
  leads: typeof leads;
  "lib/dealChecklists": typeof lib_dealChecklists;
  migrations: typeof migrations;
  properties: typeof properties;
  regions: typeof regions;
  sync: typeof sync;
  tasks: typeof tasks;
  users: typeof users;
  viewingReports: typeof viewingReports;
  viewings: typeof viewings;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
