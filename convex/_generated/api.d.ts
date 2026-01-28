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
import type * as afterSales from "../afterSales.js";
import type * as commissions from "../commissions.js";
import type * as communications from "../communications.js";
import type * as crons from "../crons.js";
import type * as dashboard from "../dashboard.js";
import type * as dealChecklists from "../dealChecklists.js";
import type * as deals from "../deals.js";
import type * as documents from "../documents.js";
import type * as emailTemplates from "../emailTemplates.js";
import type * as emails_PropertyMailingEmail from "../emails/PropertyMailingEmail.js";
import type * as leads from "../leads.js";
import type * as lib_dealChecklists from "../lib/dealChecklists.js";
import type * as mailingActions from "../mailingActions.js";
import type * as mailingTemplates from "../mailingTemplates.js";
import type * as migrations from "../migrations.js";
import type * as properties from "../properties.js";
import type * as propertyMailings from "../propertyMailings.js";
import type * as regions from "../regions.js";
import type * as reports from "../reports.js";
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
  afterSales: typeof afterSales;
  commissions: typeof commissions;
  communications: typeof communications;
  crons: typeof crons;
  dashboard: typeof dashboard;
  dealChecklists: typeof dealChecklists;
  deals: typeof deals;
  documents: typeof documents;
  emailTemplates: typeof emailTemplates;
  "emails/PropertyMailingEmail": typeof emails_PropertyMailingEmail;
  leads: typeof leads;
  "lib/dealChecklists": typeof lib_dealChecklists;
  mailingActions: typeof mailingActions;
  mailingTemplates: typeof mailingTemplates;
  migrations: typeof migrations;
  properties: typeof properties;
  propertyMailings: typeof propertyMailings;
  regions: typeof regions;
  reports: typeof reports;
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
