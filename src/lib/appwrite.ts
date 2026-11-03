import { Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1") // أو رابط السيرفر الخاص بك
  .setProject("6ae8f88c0038a40c7030"); // ضع معرف المشروع الخاص بك هنا

export const databases = new Databases(client);
export const APPWRITE_DATABASE_ID = "6ae8fb0c002bf0f1ecad"; // معرف قاعدة البيانات
export const ORDERS_TABLE_ID = "orders"; // جدول الطلبات
export const COMPLAINTS_TABLE_ID = "complaints"; // جدول الشكاوي
