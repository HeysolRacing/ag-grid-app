import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import Layout from "../../components/layout/Layout";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  ColDef,
  FirstDataRenderedEvent,
  GridReadyEvent,
  IDetailCellRendererParams,
  IsRowMaster,
} from "ag-grid-community";

export interface ICallRecord {
  activityName: string;
  allocatedPercentage: number;
  allocatedAmount: number;
}

export interface IEditLedger {
  costCenterNumber: string;
  costCenter: number;
  generalLedger: string;
  controller: string;
  totalAmount: number;
  totalFte: number;
  capex: string;
  business: string;
  budgetOwner: string;
  callRecords: ICallRecord[];
}

const LinkRenderer: React.FC<{ value: string | undefined }> = ({ value }) => {
  return value ? (
    <a href={value} target="_blank" rel="noopener noreferrer">
      {value}
    </a>
  ) : null;
};

const Master = () => {
  const gridRef = useRef<AgGridReact<IEditLedger>>(null);
  const containerStyle = useMemo(() => ({ width: '1300px', height: '600px' }), []);
  const gridStyle = useMemo(() => ({ height: '600px', width: '1300px' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const isRowMaster = useMemo<IsRowMaster>(() => {
    return (dataItem: any) => {
      console.log(dataItem);
      return dataItem ? dataItem.callRecords.length > 0 : false;
    };
  }, []);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    // group cell renderer needed for expand / collapse icons
    { headerName: "CC Number", field: "costCenterNumber", cellRenderer: "agGroupCellRenderer" },
    { headerName: "CC Name", field: "costCenter", cellRendererFramework: LinkRenderer },
    { headerName: "GL", field: "generalLedger" },
    { headerName: "Controller", field: "controller" },
    { headerName: "Total Amount Name", field: "totalAmount"},
    { headerName: "Total FTE Name", field: "totalFte" },
    { headerName: "Capex", field: "capex" },
    { field: "business" },
    { field: "budgetOwner" },  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: true,
      sortable: true,
      flex: 1,
      cellClass: 'align-right',
      minWidth: 100,
      filter: true,
      enableCellChangeFlash: true,
      resizable: true,
      pagination: true,
      paginationAutoPageSize: true,
    };
  }, []);
  const detailCellRendererParams = useMemo<any>(() => {
    return {
      detailGridOptions: {
        columnDefs: [
          { field: "activityName" },
          { field: "allocatedPercentage" },
          { field: "allocatedAmount", minWidth: 150 },
        ],
        defaultColDef: {
          flex: 1,
          cellClass: 'align-center',
          sortable: true,
          
        },
      },
      getDetailRowData: function (params) {
        params.successCallback(params.data.callRecords);
      },
    } as IDetailCellRendererParams<IEditLedger, ICallRecord>;
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch("https://hso-snowflake-demo-stages.s3.amazonaws.com/zte-snowflake/master-detail-data.json"
    )
      .then((resp) => resp.json())
      .then((data: any[]) => {
        console.log(data);
        setRowData(data);
      });
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    // arbitrarily expand a row for presentational purposes
    setTimeout(function () {
      gridRef.current!.api.getDisplayedRowAtIndex(1)!.setExpanded(true);
    }, 0);
  }, []);

  return (
    <Layout>
      <div style={containerStyle}>
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            masterDetail={true}
            isRowMaster={isRowMaster}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            detailCellRendererParams={detailCellRendererParams}
            onGridReady={onGridReady}
            onFirstDataRendered={onFirstDataRendered}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Master;
