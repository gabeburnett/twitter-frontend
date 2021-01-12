import React from 'react';
import './styles.scss';

/**
 * Required props for the tab component which includes, an array of the 
 * tab names, the current tab, and a function to be called on tab change.
 */
interface TabProps {
    tabs: Array<string>;
    currentTab: string;
    setCurrentTab: Function;
}

/**
 *  Represents the horizontal tab buttons.
 */
class Tab extends React.Component<TabProps> {

    /**
     * Returns the classes for each tab element.
     * @param value Name of the tab element.
     */
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
