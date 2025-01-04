$(function() {
  function displayUsers() {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const tableBody = $('#user-table-body');
      tableBody.empty();

      if (users.length > 0) {
          users.forEach((user, index) => {
              const row = `
                  <tr data-index="${index}">
                      <td>#${index + 1}</td>
                      <td>${user.username}</td>
                      <td>
                          <button class="btn btn-sm btn-danger delete-user"><i class="fas fa-trash"></i></button>
                      </td>
                  </tr>
              `;
              tableBody.append(row);
          });
      } else {
          const row = `
              <tr>
                  <td colspan="3" class="text-center">No users found</td>
              </tr>
          `;
          tableBody.append(row);
      }
  }

  function displaySellers() {
      const sellers = JSON.parse(localStorage.getItem('sellers')) || [];
      const tableBody = $('#seller-table-body');
      tableBody.empty();

      if (sellers.length > 0) {
          sellers.forEach((seller, index) => {
              const row = `
                  <tr data-index="${index}">
                      <td>#${index + 1}</td>
                      <td>${seller.username}</td>
                      <td>
                          <button class="btn btn-sm btn-danger delete-seller"><i class="fas fa-trash"></i></button>
                      </td>
                  </tr>
              `;
              tableBody.append(row);
          });
      } else {
          const row = `
              <tr>
                  <td colspan="3" class="text-center">No sellers found</td>
              </tr>
          `;
          tableBody.append(row);
      }
  }

function loadfromrequests(){
  requestpass=JSON.parse(localStorage.getItem('requestpass'));
  const tableBody =$('#reset-requests-body');
  tableBody.empty();
  if (requestpass.length> 0) {
  requestpass.forEach((request)=>{
    const row = `
    <tr data-id="${request.id}">
        <td>${request.id}</td>
        <td>${request.email}</td>
        <td>${request.time}</td>
        <td>
            <button class="btn btn-primary btn-approve" data-id="${request.id}">Approve</button>
            <button class="btn btn-danger btn-reject" data-id="${request.id}">Reject</button>
        </td>
    </tr>
`;
tableBody.append(row);
  });
  }
else {
  tableBody.append('<tr><td colspan="4" class="text-center">No reset requests found</td></tr>');
}

      document.querySelectorAll(".btn-approve").forEach((button) => {
        button.addEventListener("click", function() {
            const requestId = button.getAttribute("data-id");
            handleRequestAction(requestId, "approved");
        });
    });

    document.querySelectorAll(".btn-reject").forEach((button) => {
        button.addEventListener("click", function() {
            const requestId = button.getAttribute("data-id");
            handleRequestAction(requestId, "rejected");
        });
    });
  }
      function handleRequestAction(requestId, action) {
        let requestpass = JSON.parse(localStorage.getItem("requestpass")) || [];
        requestpass = requestpass.filter((req) => req.id != requestId); 
        localStorage.setItem("requestpass", JSON.stringify(requestpass));
        loadfromrequests();

        alert(`Request ID ${requestId} has been ${action}.`);
    }


  $(document).on('click', '.delete-user', function() {
      const row = $(this).closest('tr');
      const index = row.data('index');

      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.splice(index, 1);
      localStorage.setItem('users', JSON.stringify(users));
      displayUsers();
  });

  $(document).on('click', '.delete-seller', function() {
      const row = $(this).closest('tr');
      const index = row.data('index');

      const sellers = JSON.parse(localStorage.getItem('sellers')) || [];
      sellers.splice(index, 1);
      localStorage.setItem('sellers', JSON.stringify(sellers));
      displaySellers();
  });

  displayUsers();
  displaySellers();
  loadfromrequests();
  $('#menu-toggle').on('click', function() {
    const sidebar = $('.sidebar');
    const mainContent = $('.main-content');
    sidebar.toggleClass('collapsed');
    mainContent.toggleClass('collapsed');
});
  });

