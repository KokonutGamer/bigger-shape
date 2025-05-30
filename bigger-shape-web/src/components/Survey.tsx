import { useState } from 'react';
import SurveyField from './SurveyField';
import ProgressBar from './ProgressBar';



function Survey() {
  const pages = [
  {
    title: 'Income / Zip',
    fields: [
      {
        type: 'select',
        id: 'income',
        label: 'Yearly Income: ',
        options: [
          '0$ - 10,000$',
          '10,001$ - 20,000$',
          '20,001$ - 40,000$',
          '40,001$ - 60,000$',
          '60,001$ - 80,000$',
          '80,001$ - 100,000$',
          '100,001$ - 250,000$',
          '250,000$+',
        ],
      },
      {
        type: 'select',
        id: 'zipCode',
        label: 'ZipCode: ',
        options: [
          '98101', '98102', '98103', '98104', '98105', '98106', '98107',
          '98108', '98109', '98112', '98113', '98115', '98116', '98117',
          '98118', '98119', '98121', '98122', '98125', '98126', '98133',
          '98134', '98136', '98141', '98144', '98146', '98154', '98161',
          '98165', '98170', '98174', '98175', '98177', '98178', '98181',
          '98185', '98190', '98191', '98194', '98199',
        ],
      },
    ],
  },
  {
    title: 'Expenses',
    fields: [
      {
        type: 'select',
        id: 'foodCost',
        label: 'Monthly Food Spending: ',
        options: ['0$ - 50$', '51$ - 100$', '101$ - 200$', '201$ - 500$', '500$+'],
      },
      {
        type: 'select',
        id: 'rentCost',
        label: 'Monthly Rent Amount: ',
        options: [
          '0$ - 500$', '501$ - 1,000$', '1,001$ - 2,000$', '2,001$ - 3,000$',
          '3,001$ - 4,000$', '4,001$ - 5,000$', '5,000$+',
        ],
      },
      {
        type: 'select',
        id: 'addtionalCost',
        label: 'Monthly Additional Spending: ',
        options: [
          '0$ - 250$', '251$ - 500$', '501$ - 1,000$', '1,001$ - 1,500$',
          '1,501$ - 2,000$', '2,001$ - 3,000$', '3,001$ - 4,000$',
          '4,001$ - 5,000$', '5,000$+',
        ],
      },
    ],
  },
  {
    title: 'Family Info',
    fields: [
      {
        type: 'select',
        id: 'numDependents',
        label: 'Number Of Dependents: ',
        options: ['1', '2', '3', '4', '5+'],
      },
      {
        type: 'select',
        id: 'familyNearBy',
        label: 'Do you have family who can provide support within 100 miles: ',
        options: ['Yes', 'No'],
      },
    ],
  },
  {
    title: 'Personal Information',
    fields: [
      {
        type: 'select',
        id: 'age',
        label: 'Age Range (Years): ',
        options: ['Under 18', '19-25', '26-30', '30-40', '50+'],
      },
      {
        type: 'select',
        id: 'drinkAmmount',
        label: 'Average Drinks Per Week: ',
        options: ['1-2', '3-4', '5-6', '5+'],
      },
      {
        type: 'select',
        id: 'disabilityStatus',
        label: 'Disability Status: ',
        options: ['Partial Disabilty', 'Total Disabilty', 'Not Disabled'],
      },
    ],
  },
];


  const [page, setPage] = useState(0);

  function decrePage() {
    setPage((curPage) => (curPage > 0 ? curPage - 1 : curPage));
  }
  function increPage() {
    setPage((curPage) => (curPage < pages.length - 1 ? curPage + 1 : curPage));
  }

  const jsx = pages[page].fields.map((question, idx) => (
    <SurveyField key={idx} {...question} />
  ));

  return (
    <>
        <style>
            {
                `
                body {
                    background-image: linear-gradient(to top left, #bfdbfe, #3b82f6);
                }    
                `
            }
        </style>
       
      <div className="w-[90vh] h-[90vh] flex flex-col p-[5vh] bg-gradient-to-br from-blue-200 to-blue-500
            rounded-lg
            text-black
            shadow-md
           justify-center
            ">
              <h1 className="text-center text-3xl font-bold mb-4">{pages[page].title}</h1>
        <ProgressBar percent={page / (pages.length - 1) * 100}/>
        <div className="flex flex-col h-[50%]">
          {jsx}
        </div>

        <div className="flex space-x-4 justify-center">
          <button onClick={decrePage} className="px-4 py-2 bg-gradient-to-br from-blue-500 to-blue-200 text-white ">Prev</button>
          <button onClick={increPage} className="px-4 py-2 bg-gradient-to-br from-blue-500 to-blue-200 text-white ">Next</button>
        </div>
      </div>


    </>
  );
}

export default Survey;
