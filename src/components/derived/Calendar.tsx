import React, { HTMLAttributes, useMemo, useState } from 'react';
import { BaseProps } from '../../types';
import { cx, dataTestId } from '../../utils/cx';

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'>, BaseProps {
    defaultValue?: Date;
    locale?: string;
    previousMonthLabel?: string;
    nextMonthLabel?: string;
    maxDate?: Date;
    minDate?: Date;
    month?: Date;
    onChange?: (date: Date) => void;
    onMonthChange?: (month: Date) => void;
    value?: Date;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}


function startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

function dateKey(date: Date): string {
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}

function sameDay(first: Date | undefined, second: Date): boolean {
    return Boolean(first && dateKey(first) === dateKey(second));
}

export function Calendar({
    className,
    defaultValue,
    locale = 'en-US',
    previousMonthLabel = 'Previous month',
    nextMonthLabel = 'Next month',
    maxDate,
    minDate,
    month,
    onChange,
    onMonthChange,
    testId,
    value,
    weekStartsOn = 0,
    ...props
}: CalendarProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(defaultValue);
    const [uncontrolledMonth, setUncontrolledMonth] = useState(() => startOfMonth(month || value || defaultValue || new Date()));
    const monthTime = (month || uncontrolledMonth).getTime();
    const visibleMonth = useMemo(() => startOfMonth(new Date(monthTime)), [monthTime]);
    const today = startOfDay(new Date());
    const formatter = useMemo(() => new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }), [locale]);
    const dayFormatter = useMemo(() => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }), [locale]);
    const weekdays = useMemo(() => {
        const format = new Intl.DateTimeFormat(locale, { weekday: 'short' });
        return Array.from({ length: 7 }, (_, index) => format.format(new Date(2023, 0, index + 1 + weekStartsOn)));
    }, [locale, weekStartsOn]);
    const days = useMemo(() => {
        const firstDay = (visibleMonth.getDay() - weekStartsOn + 7) % 7;
        return Array.from({ length: 42 }, (_, index) => new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), index - firstDay + 1));
    }, [visibleMonth, weekStartsOn]);

    const minimum = minDate ? startOfDay(minDate).getTime() : -Infinity;
    const maximum = maxDate ? startOfDay(maxDate).getTime() : Infinity;
    const isUnavailable = (date: Date) => date.getTime() < minimum || date.getTime() > maximum;
    const selectDate = (date: Date) => {
        if (isUnavailable(date)) {
            return;
        }
        if (!value) {
            setSelectedDate(date);
        }
        onChange?.(date);
    };
    const changeMonth = (offset: number) => {
        const nextMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + offset, 1);
        if (!month) {
            setUncontrolledMonth(nextMonth);
        }
        onMonthChange?.(nextMonth);
    };
    const selected = value || selectedDate;

    return (
        <div {...props} {...dataTestId(testId)} className={cx('angin-calendar', className)}>
            <div className="angin-calendar__header">
                <button aria-label={previousMonthLabel} className="angin-calendar__nav" onClick={() => changeMonth(-1)} type="button">
                    ‹
                </button>
                <strong aria-live="polite" className="angin-calendar__month">{formatter.format(visibleMonth)}</strong>
                <button aria-label={nextMonthLabel} className="angin-calendar__nav" onClick={() => changeMonth(1)} type="button">
                    ›
                </button>
            </div>
            <div aria-hidden="true" className="angin-calendar__weekdays">
                {weekdays.map((weekday) => <span key={weekday}>{weekday}</span>)}
            </div>
            <div className="angin-calendar__grid" role="grid">
                {days.map((date) => {
                    const outsideMonth = date.getMonth() !== visibleMonth.getMonth();
                    const unavailable = isUnavailable(date);
                    return (
                        <button
                            aria-current={sameDay(today, date) ? 'date' : undefined}
                            aria-label={dayFormatter.format(date)}
                            aria-pressed={sameDay(selected, date)}
                            className={cx(
                                'angin-calendar__day',
                                outsideMonth && 'angin-calendar__day--outside',
                                sameDay(today, date) && 'angin-calendar__day--today',
                                sameDay(selected, date) && 'angin-calendar__day--selected',
                            )}
                            data-date={dateKey(date)}
                            disabled={unavailable}
                            key={dateKey(date)}
                            onClick={() => selectDate(date)}
                            role="gridcell"
                            type="button"
                        >
                            {date.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
