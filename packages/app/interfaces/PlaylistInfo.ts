export interface Item {
  etag: string;
  kind: string;
  id: string;
  snippet: {
    categoryId: string;
    channelId: string;
    channelTitle: string;
    title: string;
    description: string;
    tags: string[];
    resourceId: {
      videoId: string;
    };
    thumbnails: {
      default: ThumbnailInfo;
      medium: ThumbnailInfo;
      high: ThumbnailInfo;
    };
  };
  status: {
    privacyStatus: string;
  };
}

export interface ThumbnailInfo {
  url: string;
  width: number;
  height: number;
}

export interface PageInfo {
  resultsPerPage: number;
  totalResults: number;
}

export interface PlaylistInfo {
  playlist?: {
    title?: string;
  };
  etag: string;
  items: Item[];
  kind: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: PageInfo;
}
