import SearchOutlined from "@ant-design/icons/SearchOutlined";

interface SearchBoxProps {
  searchText: string;
  onSearchTextchange: (value: string) => void,
  placeholder: string;
  classes?: string;
}

export default function SearchBox({ searchText, onSearchTextchange, placeholder, classes }: SearchBoxProps) {

  return (
    <div className={classes} dir="rtl">
      <div className="flex items-center bg-white rounded-full shadow-md p-2 border border-gray-300">
        <SearchOutlined className="text-gray-500 mr-3" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchText}
          onChange={(e) => onSearchTextchange(e.target.value)}
          className="flex-1 p-1 bg-transparent outline-none text-gray-700"
        />
      </div>
    </div>
  )
}
