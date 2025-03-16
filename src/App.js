import { useState } from 'react';
import './App.css';
import Dropdown from './Dropdown';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Option 3');

  const optionsLong = Array.from({ length: 30 }, (_, i) => `Option ${i + 1}`);
  const [isOpenMulti, setIsOpenMulti] = useState(false);
  const [selectedMulti, setSelectedMulti] = useState(['Option 3']);

  return (
    <div className="App">
      <div className="display">
        Single-select
        <Dropdown
          label='Age'
          options={['Twenty', 'Twenty one', 'Twenty one and a half']}
          multiselect={false}
          defaultSelected="Option 1"
          onSelect={option => console.log('Selected:', option)}
        />
      </div>

      <div className="display">
        Multi-select
        <Dropdown
          label='Tag'
          options={['Option 1', 'Option 2', 'Option 3']}
          multiselect={true}
          defaultSelected={['Option 1']}
          onSelect={selected => console.log('Selected:', selected)}
        />
      </div>

      <div className="display">
        Controlled Single
        <i>{`Open: ${isOpen}`}</i>
        <i>{`Selected: ${selected}`}</i>
        <Dropdown
          label='Tag'
          options={optionsLong}
          multiselect={false}
          selectedOptions={selected}
          onSelect={selected => setSelected(selected)}
          open={isOpen}
          onToggleDropdown={() => setIsOpen(open => !open)}
        />
      </div>

      <div className="display">
        Controlled Multi
        <i>{`Open: ${isOpenMulti}`}</i>
        <i>{`Selected: ${selectedMulti}`}</i>
        <Dropdown
          label='Tag'
          options={optionsLong}
          multiselect={true}
          selectedOptions={selectedMulti}
          onSelect={selected => setSelectedMulti(selected)}
          open={isOpenMulti}
          onToggleDropdown={() => setIsOpenMulti(open => !open)}
        />
      </div>
    </div>
  );
}

export default App;
