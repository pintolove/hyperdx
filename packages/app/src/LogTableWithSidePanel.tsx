import { useState, useCallback } from 'react';
import usePortal from 'react-useportal';

import type { LogView } from './types';
import LogSidePanel from './LogSidePanel';
import LogTable from './LogTable';

export function LogTableWithSidePanel({
  config,
  isUTC,
  isLive,
  onScroll,
  selectedSavedSearch,
  onPropertySearchClick,
  onRowExpandClick,
  onPropertyAddClick,
  setIsUTC,
  onSettled,
}: {
  config: {
    where: string;
    dateRange: [Date, Date];
  };
  isUTC: boolean;
  isLive: boolean;

  onPropertySearchClick: (
    property: string,
    value: string | number | boolean,
  ) => void;
  setIsUTC: (isUTC: boolean) => void;

  onPropertyAddClick?: (name: string, value: string | boolean | number) => void;
  onRowExpandClick?: (logId: string, sortKey: string) => void;
  onScroll?: (scrollTop: number) => void | undefined;
  selectedSavedSearch?: LogView | undefined;

  onSettled?: () => void;
}) {
  const { where: searchedQuery, dateRange: searchedTimeRange } = config;

  const [openedLog, setOpenedLog] = useState<
    { id: string; sortKey: string } | undefined
  >();

  // Needed as sometimes the side panel will be contained with some
  // weird positioning and it breaks the slideout
  const { Portal } = usePortal();

  const generateSearchUrl = useCallback(
    (newQuery?: string, newTimeRange?: [Date, Date]) => {
      const qparams = new URLSearchParams({
        q: newQuery ?? searchedQuery,
        from: newTimeRange
          ? newTimeRange[0].getTime().toString()
          : searchedTimeRange[0].getTime().toString(),
        to: newTimeRange
          ? newTimeRange[1].getTime().toString()
          : searchedTimeRange[1].getTime().toString(),
      });
      return `/search${
        selectedSavedSearch != null ? `/${selectedSavedSearch._id}` : ''
      }?${qparams.toString()}`;
    },
    [searchedQuery, searchedTimeRange, selectedSavedSearch],
  );

  const generateChartUrl = useCallback(
    ({ aggFn, field, groupBy }) => {
      return `/chart?series=${encodeURIComponent(
        JSON.stringify({
          type: 'time',
          aggFn,
          field,
          where: searchedQuery,
          groupBy,
        }),
      )}`;
    },
    [searchedQuery],
  );

  const voidFn = useCallback(() => {}, []);

  return (
    <>
      {openedLog != null ? (
        <Portal>
          <LogSidePanel
            logId={openedLog?.id}
            sortKey={openedLog?.sortKey}
            onClose={() => {
              setOpenedLog(undefined);
            }}
            onPropertyAddClick={onPropertyAddClick}
            generateSearchUrl={generateSearchUrl}
            generateChartUrl={generateChartUrl}
          />
        </Portal>
      ) : null}
      <LogTable
        isLive={isLive}
        setIsUTC={setIsUTC}
        onScroll={onScroll ?? voidFn}
        highlightedLineId={openedLog?.id}
        config={config}
        onPropertySearchClick={onPropertySearchClick}
        formatUTC={isUTC}
        onRowExpandClick={useCallback(
          (id: string, sortKey: string) => {
            setOpenedLog({ id, sortKey });
            onRowExpandClick?.(id, sortKey);
          },
          [setOpenedLog, onRowExpandClick],
        )}
        onEnd={onSettled}
      />
    </>
  );
}
