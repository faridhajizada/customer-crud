import { useState } from 'react';
import './Form.css';
import { AddUser, FetchAllUsers, UpdateUser } from '../utils/CrudFunctions';

type Address = {
  street?: string;
  city?: string;
  region?: string | null;
  postalCode?: string;
  country?: string;
  phone?: string;
};

type User = {
  id: string;
  companyName?: string;
  contactName?: string;
  contactTitle?: string;
  address?: Address;
};

export function Form({ setUsers, use, users, setUpdate, forwhat, setAdd }: any) {
  const [user, setUser] = useState<User>(use ? use :  {
    id: "",
    companyName: "",
    contactName: "",
    contactTitle: "",
    address: {
      street: "",
      city: "",
      region: "",
      postalCode: "",
      country: "",
      phone: ""
    }
  });

  const handleSubmit = async () => {
    if (forwhat === 'update') {
      const result = await UpdateUser(user.id, user);
      if (result) {
        setUsers(users.map((u: { id: string | undefined; }) => u.id === user.id ? user : u));
        setUpdate(false);
      }
    } else if (forwhat === 'add') {
      const result = await AddUser(user);
      if (result) {
        const data = await FetchAllUsers();
        setUsers(data);
        setAdd(false);
      }
    }
  }

  return (
    <div className='bground'>

      <div className="form-container">
        <form action="" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>

          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input
              type="text"
              id="id"
              name="id"
              value={user.id || ''}
              onChange={(e) => setUser({...user, id: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={user.companyName || ''}
              onChange={(e) => setUser({...user, companyName: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactName">Contact Name</label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={user.contactName || ''}
              onChange={(e) => setUser({...user, contactName: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactTitle">Contact Title</label>
            <input
              type="text"
              id="contactTitle"
              name="contactTitle"
              value={user.contactTitle || ''}
              onChange={(e) => setUser({...user, contactTitle: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              name="address.street"
              value={user.address?.street || ''}
              onChange={(e) => setUser({...user, address: {...user.address, street: e.target.value}})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="address.city"
              value={user.address?.city || ''}
              onChange={(e) => setUser({...user, address: {...user.address, city: e.target.value}})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="address.phone"
              value={user.address?.phone || ''}
              onChange={(e) => setUser({...user, address: {...user.address, phone: e.target.value}})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="address.postalCode"
              value={user.address?.postalCode || ''}
              onChange={(e) => setUser({...user, address: {...user.address, postalCode: e.target.value}})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="address.country"
              value={user.address?.country || ''}
              onChange={(e) => setUser({...user, address: {...user.address, country: e.target.value}})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="region">Region</label>
            <input
              type="text"
              id="region"
              name="address.region"
              value={user.address?.region || ''}
              onChange={(e) => setUser({...user, address: {...user.address, region: e.target.value}})}
              required
            />
          </div>

          <div className="form-group">
            <button type="submit" 
              style={{
                backgroundColor: 'blue', 
                color: 'white', 
                border: 'none', 
                padding: '10px 20px', 
                textAlign: 'center', 
                textDecoration: 'none', 
                display: 'inline-block', 
                fontSize: '16px', 
                margin: '4px 2px', 
                cursor: 'pointer', 
                borderRadius: '4px' 
            }}
            >
              Submit
            </button>

            <button 
              style={{
                backgroundColor: 'red', 
                color: 'white', 
                border: 'none', 
                padding: '10px 20px', 
                textAlign: 'center', 
                textDecoration: 'none', 
                display: 'inline-block', 
                fontSize: '16px', 
                margin: '4px 2px', 
                cursor: 'pointer', 
                borderRadius: '4px',
            }}
              onClick={() => setAdd(false)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
