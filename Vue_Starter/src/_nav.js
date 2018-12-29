export default {
  items: [
    {
      name: 'demo',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      title: true,
      name: 'Theme',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: '申請單',
      url: '/hello',
      icon: 'icon-pencil',
      children: [
        {
          name: 'Hello1',
          url: '/hello1',
          icon: 'icon-speedometer'
        },
        {
          name: 'Hello2',
          url: '/hello2',
          icon: 'icon-speedometer'
        },
        {
          name: '加班單',
          url: '/form',
          icon: 'icon-docs'
        },
        {
          name: '表單',
          url: '/form2',
          icon: 'icon-docs'
        }
      ]
    },
    {
      name: '簽核申請單',
      url: '/table',
      icon: 'icon-note',
      children: [
        {
          name: 'Table1',
          url: '/table1',
          icon: 'icon-speedometer'
        },
        {
          name: 'Table2',
          url: '/table2',
          icon: 'icon-speedometer'
        }
      ]
    }
  ]
}
