module.exports = {
  format_time: (time) => {
    const [hours, minutes, seconds] = time.split(':');
    const dateObj = new Date();
    dateObj.setHours(hours);
    dateObj.setMinutes(minutes);
    dateObj.setSeconds(seconds);
    return dateObj.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      hourCycle: 'h23',
    });
  },

  format_date: (date) => {
    if (date) {
      return `${new Date(date).getMonth() + 1}/${new Date(
        date
      ).getDate()}/${new Date(date).getFullYear()}`;
    } else {
      return '';
    }
  },
};
