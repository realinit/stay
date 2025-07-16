import React, { useRef } from "react";
import { useVirtual } from "react-virtual";

interface VirtualizedListCommonProps {
  list: any[];
  CardComponent: React.ComponentType<any>;
}

const VirtualizedListCommon: React.FC<VirtualizedListCommonProps> = ({
  list,
  CardComponent,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtual({
    size: list.length,
    parentRef,
  });

  return (
    <div ref={parentRef} className="h-[calc(100vh-100px)] overflow-auto List">
      <div
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.virtualItems.map(
          (virtualItem: { index: number; measureRef: any; start: any }) => (
            <div
              key={virtualItem.index}
              ref={virtualItem.measureRef}
              className="absolute left-0 top-0 w-full"
              style={{
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <div className="py-2 w-full">
                <CardComponent
                  index={virtualItem.index}
                  result={list[virtualItem.index]}
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default React.memo(VirtualizedListCommon); 