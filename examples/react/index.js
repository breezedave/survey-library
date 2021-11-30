function init() {
  //Add the price property into choices
  Survey.Serializer.addProperty("itemvalue", "price:number");

  var getItemPrice = function (params) {
    //this.row property available in cells of dropdown and dynamic matrices questions
    var question = !!this.row
      ? this.row.getQuestionByColumnName(params[0])
      : null;
    //if we can't find a question inside the cell (by row and column name) then return
    if (!question) return 0;

    //get the selected item/choice
    var selItem = question.selectedItem;
    //return 0 if a user did not select the item yet.
    return !!selItem ? selItem.price : 0;
  };
  //Register the custom function
  Survey.FunctionFactory.Instance.register("getItemPrice", getItemPrice);

  var json = {
    description: "Survey Description",
    title: "Survey New Design Test",
    elements: [
      {
        "type": "ranking",
        "name": "smartphone-features",
        "title": "Please rank the following smartphone features in order of importance:",
        "isRequired": true,
        fallbackToSortableJS: false,
        "choices": [
          "Battery life",
          "Screen size",
          "Storage space",
          "Camera quality",
          "Durability",
          "Processor power",
          "Price",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
        ]
      }
    ]
  };

  Survey.StylesManager.applyTheme("modern");
  var model = new Survey.Model(json);
  //model.setDesignMode(true);
  window.survey = model;

  model.onUploadFiles
    .add(function (survey, options) {
      options.callback("success", options.files.map(function (file) {
        return {
          file: file,
          content: "https://surveyjs.io/Content/Images/design/Logo.svg"
        };
      }));
    });

  ReactDOM.render(
    <Survey.Survey model={model} />,
    document.getElementById("surveyElement")
  );
}

if (!window["%hammerhead%"]) {
  init();
}