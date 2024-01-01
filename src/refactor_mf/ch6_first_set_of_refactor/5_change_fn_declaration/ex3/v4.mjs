// I have a function which determines if a customer is based in New England.



// 全部都改好的，換回本來的名字
const newEnglanders = someCustomers.filter(c => inNewEngland(c.address.state));
const newEnglanders2 = someCustomers.filter(c => inNewEngland(c.address.state));


function inNewEngland(stateCode) {
  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}


/**
 * Automated refactoring tools make the migration mechanics both less useful and more effective. They make it less useful because they handle even complicated renames and parameter changes safer, so I don’t have to use the migration approach as often as I do without that support. However, in cases like this example, where the tools can’t do the whole refactoring, they still make it much easier as the key moves of extract and inline can be done more quickly and safely with the tool.
 */
