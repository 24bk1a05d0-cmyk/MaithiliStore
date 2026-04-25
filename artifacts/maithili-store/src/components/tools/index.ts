import type { ComponentType } from "react";
import { JsonFormatter } from "./JsonFormatter";
import { RegexTester } from "./RegexTester";
import { Base64Tool } from "./Base64Tool";
import { UrlEncoder } from "./UrlEncoder";
import { UuidGenerator } from "./UuidGenerator";
import { MarkdownPreview } from "./MarkdownPreview";
import { ColorPicker } from "./ColorPicker";
import { ColorPalette } from "./ColorPalette";
import { ContrastChecker } from "./ContrastChecker";
import { AspectRatio } from "./AspectRatio";
import { Pomodoro } from "./Pomodoro";
import { WordCounter } from "./WordCounter";
import { HashtagGenerator } from "./HashtagGenerator";
import { CaptionIdeas } from "./CaptionIdeas";
import { QrGenerator } from "./QrGenerator";
import { RandomPicker } from "./RandomPicker";
import { Flashcards } from "./Flashcards";
import { CitationGenerator } from "./CitationGenerator";
import { InvoiceGenerator } from "./InvoiceGenerator";
import { ResumeMaker } from "./ResumeMaker";

export const TOOL_COMPONENTS: Record<string, ComponentType> = {
  "json-formatter": JsonFormatter,
  "regex-tester": RegexTester,
  base64: Base64Tool,
  "url-encoder": UrlEncoder,
  "uuid-generator": UuidGenerator,
  "markdown-preview": MarkdownPreview,
  "color-picker": ColorPicker,
  "color-palette": ColorPalette,
  "contrast-checker": ContrastChecker,
  "aspect-ratio": AspectRatio,
  pomodoro: Pomodoro,
  "word-counter": WordCounter,
  "hashtag-generator": HashtagGenerator,
  "caption-ideas": CaptionIdeas,
  "qr-generator": QrGenerator,
  "random-picker": RandomPicker,
  flashcards: Flashcards,
  "citation-generator": CitationGenerator,
  "invoice-generator": InvoiceGenerator,
  "resume-maker": ResumeMaker,
};
