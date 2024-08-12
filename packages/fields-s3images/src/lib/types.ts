import { FileUpload } from 'graphql-upload';
import {
  BaseListTypeInfo,
  CommonFieldConfig,
  ImageMetadata,
  KeystoneContext,
} from '@keystone-6/core/types';

export type AssetMode = 's3';
export type AssetType = 'image';

export type ImageSize = 'base64' | 'sm' | 'md' | 'lg' | 'full';

export type ImagesData = {
  id: string;
  size: ImageSize,
  sizesMeta?: Partial<Record<ImageSize, ImagesData>>;
  base64Data?: string;
} & ImageMetadata;

export type GetFileNameArg = {
  id: string;
  originalFilename: string;
  context: KeystoneContext;
};

export type GetUploadParams = {
  id: string;
  originalFilename: string;
};

export type S3ImagesSizes = {
  /** = 360? */
  sm?: number;
  /** = 720? */
  md?: number;
  /** = 1280? */
  lg?: number;
  /** not generated by default. Use a small number, like 10 to enable */
  base64?: number;
};

export type S3ImagesConfig = {
  bucket: string;
  folder?: string;
  baseUrl?: string;
  /** default to os.tmpdir() */
  tmpdir?: string;
  /** define width, set value 0 to not generate that image, it will be same as next bigger size */
  sizes?: S3ImagesSizes;
  defaultSize?: Exclude<ImageSize, 'base64'>;
  transformFilename?: (str: string) => string;
  getFilename?: (args: GetFileNameArg) => string;
  getUrl?: (config: S3ImagesConfig, fileData: ImagesData) => string;
  uploadParams?: (args: ImagesData) => Partial<AWS.S3.Types.PutObjectRequest>;
  s3Options: AWS.S3.ClientConfiguration;
};

export type S3FieldInputType =
  | undefined
  | null
  | { upload?: Promise<FileUpload> | null; ref?: string | null };

export type S3FieldConfig<ListTypeInfo extends BaseListTypeInfo> =
  CommonFieldConfig<ListTypeInfo> & {
    s3Config: S3ImagesConfig;
  };
