import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({
  value,
  onChange,
  onKeyDown,
  onSubmit,
  placeholder = 'Search...',
  variant = 'hero',
  buttonLabel = 'Search',
}) => {
  const variantStyles = {
    hero: {
      wrapper:
        'flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full',
      inputWrapper:
        'relative flex items-center flex-1 bg-gradient-to-r from-gray-800/60 to-gray-800/40 backdrop-blur-md rounded-2xl border border-accent/30 transition-all shadow-lg ' +
        'focus-within:border-accent/50 focus-within:shadow-[0_0_20px_rgba(236,72,153,0.3)]',
      icon: 'w-6 h-6 text-accent ml-6',
      input:
        'flex-1 bg-transparent text-white px-4 py-4 outline-none text-sm md:text-lg placeholder:text-gray-500',
      button:
        'cursor-pointer bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white px-8 py-4 font-semibold rounded-2xl transition-all shadow-lg hover:shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:scale-[1.02] active:scale-[0.98]',
    },

    inline: {
      wrapper:
        'flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full',
      inputWrapper:
        'relative flex items-center flex-1 bg-gradient-to-r from-gray-800/60 to-gray-800/40 backdrop-blur-md rounded-xl border border-accent/30 transition-all shadow-md ' +
        'focus-within:border-accent/50 focus-within:shadow-[0_0_18px_rgba(236,72,153,0.25)]',
      icon: 'w-5 h-5 text-accent ml-5',
      input:
        'flex-1 bg-transparent text-white px-4 py-3 outline-none text-base placeholder:text-gray-500',
      button:
        'cursor-pointer bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white px-6 py-3 font-semibold rounded-xl transition-all shadow-md hover:shadow-[0_0_20px_rgba(236,72,153,0.35)] hover:scale-[1.02] active:scale-[0.98]',
    },

    nav: {
      wrapper: 'flex items-center gap-2 w-full max-w-md',
      inputWrapper:
        'relative flex items-center flex-1 bg-gradient-to-r from-gray-800/60 to-gray-800/40 backdrop-blur-md rounded-2xl border border-accent/30 transition-all ' +
        'focus-within:border-accent/50 focus-within:shadow-[0_0_20px_rgba(236,72,153,0.2)]',
      icon: 'w-4 h-4 text-accent ml-4',
      input:
        'flex-1 bg-transparent text-white px-3 py-3 outline-none text-sm placeholder:text-gray-500',
      button: 'hidden',
    },
  };

  const styles = variantStyles[variant] || variantStyles.hero;

  return (
    <div className="relative">
      <div className={styles.wrapper}>
        <div className={styles.inputWrapper}>
          <Search className={styles.icon} />
          <input
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className={styles.input}
          />
        </div>
        {variant !== 'nav' && (
          <button type="button" onClick={onSubmit} className={styles.button}>
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;