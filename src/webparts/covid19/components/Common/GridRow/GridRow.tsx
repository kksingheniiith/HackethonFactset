import * as React from 'react';
import {IGridRowProps, IGridRowStates} from './IGridRow';
import './GridRow.css';

export class GridRow extends React.Component<IGridRowProps, IGridRowStates> {
    constructor(props: any){
        super(props);
        this.getColumns = this.getColumns.bind(this);
    }

    private getColumns() {
        var indents = [];
        for (var i = 0; i < this.props.cols.length; i++) {
        indents.push(<div className="grid-cell" style={{width: 100/this.props.cols.length + "%", display: "inline-block", paddingLeft: "10px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}} key={i}>{this.props.cols[i]}</div>);
        }
        return indents;
    }

    public render(): React.ReactElement<IGridRowProps> {
        let i = 0;
        return (
            <div className={this.props.isEven ? "grid-row grid-row-even-color" :"grid-row"}>
                {this.getColumns()}
            </div>
        );
    }
}