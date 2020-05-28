import * as React from 'react';
import {IGridHeaderProps, IGridHeaderStates} from './IGridHeader';
import './GridHeader.css';

export class GridHeader extends React.Component<IGridHeaderProps, IGridHeaderStates> {
    constructor(props: any){
        super(props);
        this.getColumns = this.getColumns.bind(this);
    }

    private getColumns() {
        var indents = [];
        for (var i = 0; i < this.props.cols.length; i++) {
        indents.push(<div className='grid-column' style={{width: 100/this.props.cols.length + "%", display: "inline-block", paddingLeft: "10px"}} key={i}>{this.props.cols[i]}</div>);
        }
        return indents;
    }

    public render(): React.ReactElement<IGridHeaderProps> {
        let i = 0;
        return (
            <div className="grid-header">
                {this.getColumns()}
            </div>
        );
    }
}