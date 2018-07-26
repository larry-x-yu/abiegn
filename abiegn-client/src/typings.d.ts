/*
 * Extra typings definitions
 */

// Allow .json files imports
declare module '*.json';

// SystemJS module definition
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface AutoSpecLineItem {
  item: string;
  description: string;
  price: number;
}

interface AutoSpec {
  title: string;
  base: AutoSpecLineItem[];
  packages: AutoSpecLineItem[];
  optionalPackages: AutoSpecLineItem[];
  options: AutoSpecLineItem[];
  optionalOptions: AutoSpecLineItem[];
  destinationAndHandling: number;
}