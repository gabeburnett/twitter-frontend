import React from 'react';
import './styles.scss';

interface TabProps {
    tabs: Array<string>;
    currentTab: string;
    setCurrentTab: Function;
}

class Tab extends React.Component<TabProps> {

    getClasses(value: string) {
        let classes = "tab__btn";
        if (value === this.props.currentTab) classes += " tab__btn-active";
        return classes;
    }

    render() {
        return (
            <div className="tab">
                {this.props.tabs.map((value: string) => {
                    return <button className={this.getClasses(value)} onClick={() => this.props.setCurrentTab(value)} key={value}>{value}</button>
                })}
            </div>
        );
    }
}

export default Tab;
