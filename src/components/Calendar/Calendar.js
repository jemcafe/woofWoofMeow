import React, { Component } from 'react';
import './Calendar.css';
import arrowLeft from '../../assets/img/arrow_left.png';
import arrowRight from '../../assets/img/arrow_right.png';

class Calendar extends Component {
    constructor () {
        super();
        this.state = {
            yyyy: 0,
            mm: 0,
            dd: 0,
            day: 0,
            numOfDays: 0,
            monthOffset: 0,
            week: 0,
            daysOffset: -1,
        }
    }

    componentDidMount () {
        // The calendar will always start with the current date
        const date = new Date();
        const yyyy = date.getFullYear();
        const mm = date.getMonth();
        const dd = date.getDate();
        const day = date.getDay();
        const numOfDays = new Date(yyyy, mm + 1, 0).getDate();

        console.log( 'Date: ', date );
        console.log( 'year: ', yyyy );
        console.log( 'Month: ', mm );
        console.log( 'Day of the Month: ', dd );
        console.log( 'Day: ', day );
        console.log( 'Number of Days: ', numOfDays );

        this.setState({ 
            yyyy: yyyy,
            dd: dd,
            mm: mm,
            day: day,
            numOfDays: numOfDays,
            monthOffset: 0,
            daysOffset: (date.getDate() % 7 !== date.getDay()) ? (date.getDate() % 7 - (date.getDay() + 1)) : -1
        });
        // daysOffet is needed to offset the days of each month in the calendar, so the date starts on the right day
        // The ternary checks if the current date in the current week ( % remaining days ) is not equal to to the current day
        // If it's not, the offset will be the difference between the days remaining and current day
        // The default offset is -1, and 7 is used because there's 7 days in a week
    }

    handleMonthChange ( direction ) {
        const date = new Date();
        // The month is set to a different month depending on the offset
        date.setMonth( date.getMonth() + this.state.monthOffset );
        // The default day of the month is the first day of the month
        date.setDate( 1 );
        // The number of days in the month
        const numOfDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        if ( direction === 'right' ) {
            this.setState(prevState => ({ 
                yyyy: date.getFullYear(),
                mm: date.getMonth(),
                dd: date.getDate(),
                day: date.getDay(),
                numOfDays: numOfDays,
                monthOffset: prevState.monthOffset + 1,
                daysOffset: (date.getDate() % 7 !== date.getDay()) ? (date.getDay() - (date.getDate() % 7)) : -1
            }));
        }
        if ( direction === 'left' ) {
            this.setState(prevState => ({
                yyyy: date.getFullYear(),
                mm: date.getMonth(),
                dd: date.getDate(),
                day: date.getDay(),
                numOfDays: numOfDays,
                monthOffset: prevState.monthOffset - 1,
                daysOffset: (date.getDate() % 7 !== date.getDay()) ? (date.getDay() - (date.getDate() % 7)) : -1
            }));
        }
        console.log( 'Date: ', date );
        console.log( 'Year: ',  date.getFullYear() );
        console.log( 'Month: ',  date.getMonth() );
        console.log( 'Day: ', date.getDay() );
        console.log( 'Number of Days: ', numOfDays );
        console.log( 'Remaining Days', date.getDate() );
    }

    render () {
        const months = [
            "January",
            "Feburary",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        const days = [
            "Sunday", 
            "Monday", 
            "Tuesday", 
            "Wednesday", 
            "Thursday", 
            "Friday", 
            "Saturday"
        ];
        const weeks = [ 
            new Array(days.length), 
            new Array(days.length), 
            new Array(days.length), 
            new Array(days.length), 
            new Array(days.length) 
        ];
        const monthDays = new Array(weeks.length * days.length);
        
        // The indexes for the month, day of the month, and day of the week
        // daysOffset offsets the month's days to start on the right day. -1 is the start.
        const { mm, dd, day, numOfDays, daysOffset } = this.state;

        for ( let i = 0; i < weeks.length; i++ ) { 
            for ( let j = 0; j < days.length; j++ ) {
                // The index for all 35 days in the calendar sheet
                const dayIndex = j + (i * 7);
                
                // If the dayIndex is within the specific month's range of days it will have a number
                if ( dayIndex > daysOffset && dayIndex <= (numOfDays + daysOffset) ) {
                    monthDays[dayIndex] = dayIndex - daysOffset;
                } else {
                    monthDays[dayIndex] = '-';
                }

                // The week days are set to the specific month's day number;
                weeks[i][j] = monthDays[dayIndex];
            }
        }

        return (
            <div className="calendar">
                <div className="container">

                    <h1>Calendar</h1>

                    <div className="layout">

                        <div className="months">
                            <div className="arrow" onClick={ () => this.handleMonthChange('left') }><img src={ arrowLeft } alt="left arrow"/></div>
                            <div className="month">{ months[mm].month } { this.state.yyyy }</div>
                            <div className="arrow" onClick={ () => this.handleMonthChange('right') }><img src={ arrowRight } alt="right arrow"/></div>
                        </div>

                        <div className="days">
                            { days.map( (e, i) => <div key={i} className="day">{ e.slice(0, 3) }</div> ) }
                        </div>

                        <div className="weeks">
                            { weeks.map( week => (
                            <div className="week">
                                { week.map( day => (
                                <div className="day-block">{ day }</div> 
                                )) }
                            </div>
                            )) }
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default Calendar;