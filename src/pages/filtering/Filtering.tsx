import React, {
    useCallback,
    useMemo,
    useState,
  } from "react";
  import Layout from "../../components/layout/Layout";
  import { AgGridReact } from "ag-grid-react";
  import "ag-grid-community/styles/ag-grid.css";
  import "ag-grid-community/styles/ag-theme-alpine.css";
  import {
    ColDef,
    GridReadyEvent,
    IMultiFilterParams,
    ITextFilterParams,
    SideBarDef,
  } from 'ag-grid-community';
  
  export interface IOlympicData {
    athlete: string;
    age: number;
    country: string;
    year: number;
    date: string;
    sport: string;
    gold: number;
    silver: number;
    bronze: number;
    total: number;
  }

  const Filtering = () => {
    const containerStyle = useMemo(() => ({ width: '600px', height: '800px' }), []);
    const gridStyle = useMemo(() => ({ height: '600px', width: '800px' }), []);
  
    const [rowData, setRowData] = useState<IOlympicData[]>();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
      { field: 'athlete', filter: 'agMultiColumnFilter' },
      {
        field: 'country',
        filter: 'agMultiColumnFilter',
        filterParams: {
          filters: [
            {
              filter: 'agTextColumnFilter',
              filterParams: {
                defaultOption: 'startsWith',
              } as ITextFilterParams,
            },
            {
              filter: 'agSetColumnFilter',
            },
          ],
        } as IMultiFilterParams,
      },
      {
        field: 'gold',
        filter: 'agMultiColumnFilter',
        filterParams: {
          filters: [
            {
              filter: 'agNumberColumnFilter',
            },
            {
              filter: 'agSetColumnFilter',
            },
          ],
        } as IMultiFilterParams,
      },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
      return {
        flex: 1,
        minWidth: 250,
        resizable: true,
        menuTabs: ['filterMenuTab'],
      };
    }, []);
    const sideBar = useMemo<
      SideBarDef | string | string[] | boolean | null
    >(() => {
      return {
        toolPanels: ['filters'],
      };
    }, []);
  
    const onGridReady = useCallback((params: GridReadyEvent) => {
      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data: IOlympicData[]) => setRowData(data));
    }, []);
  
    return (
      <Layout>
         <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact<IOlympicData>
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          sideBar={sideBar}
          onGridReady={onGridReady}
        />
      </div>
    </div>
      </Layout>
    );
  };
  
  export default Filtering;
  