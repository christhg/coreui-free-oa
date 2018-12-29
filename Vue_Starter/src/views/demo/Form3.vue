<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" md="6">
        <b-card no-body :no-block="true">
          <div slot="header">
            <strong>Validation feedback</strong> Form
          </div>
          <b-card-body>
            <b-form-group>
              <label class="col-form-label" for="inputIsValid">Input is valid</label>
              <input type="text" class="form-control is-valid" id="inputIsValid">
              <b-form-valid-feedback>
                Input is valid.
              </b-form-valid-feedback>
            </b-form-group>
            <b-form-group>
              <label class="col-form-label" for="inputIsInvalid">Input is invalid</label>
              <input type="text" class="form-control is-invalid" id="inputIsInvalid">
              <b-form-invalid-feedback>
                Please provide a valid information.
              </b-form-invalid-feedback>
            </b-form-group>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col sm="12" md="6">
        <b-card no-body :no-block="true">
          <div slot="header">
            <strong>Validation feedback</strong> Form
          </div>
          <b-card-body>
            <b-form validated novalidate>
              <b-form-group label-for="inputSuccess2" label="Non-required input">
                <b-form-input type="text" class="form-control-success" id="inputSuccess2"></b-form-input>
                <b-form-valid-feedback>
                  Input is not required.
                </b-form-valid-feedback>
              </b-form-group>
              <b-form-group label-for="inputError2" label="Required input">
                <b-form-input type="text" class="form-control-warning" id="inputError2" required></b-form-input>
                <b-form-valid-feedback>
                  Input provided.
                </b-form-valid-feedback>
                <b-form-invalid-feedback>
                  Please provide a required input.
                </b-form-invalid-feedback>
              </b-form-group>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="4">
        <b-card>
          <div slot="header">
            <strong>Icon/Text</strong> Groups
          </div>
          <b-form-group>
            <b-input-group>
              <b-input-group-prepend>
                <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
              </b-input-group-prepend>
              <b-form-input type="text" placeholder="Username"></b-form-input>
            </b-input-group>
          </b-form-group>
          <b-form-group>
            <b-input-group>
              <b-form-input type="email" placeholder="Email"></b-form-input>
              <b-input-group-append><b-input-group-text><i class="fa fa-envelope-o"></i></b-input-group-text></b-input-group-append>
            </b-input-group>
          </b-form-group>
          <b-form-group>
            <b-input-group>
              <b-input-group-prepend>
                <b-input-group-text><i class="fa fa-euro"></i></b-input-group-text>
              </b-input-group-prepend>
              <b-form-input type="text" placeholder="ex. $1.000.000"></b-form-input>
              <b-input-group-append><b-input-group-text>.00</b-input-group-text></b-input-group-append>
            </b-input-group>
          </b-form-group>
          <div slot="footer">
            <b-button type="submit" size="sm" variant="success"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
            <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
          </div>
        </b-card>
      </b-col>
      <b-col sm="4">
        <b-card>
          <div slot="header">
            <strong>Buttons</strong> Groups
          </div>
          <b-form-group>
            <b-input-group>
              <!-- Attach Left button -->
              <b-input-group-prepend>
                <b-button variant="primary">
                  <i class="fa fa-search"></i> Search
                </b-button>
              </b-input-group-prepend>
              <b-form-input type="text" placeholder="Username"></b-form-input>
            </b-input-group>
          </b-form-group>
          <b-form-group>
            <b-input-group>
              <b-form-input type="email" placeholder="Email"></b-form-input>
              <!-- Attach Right button -->
              <b-input-group-append>
                <b-button variant="primary">Submit</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <b-form-group>
            <b-input-group>
              <!-- Attach Left button -->
              <b-input-group-prepend>
                <b-button variant="primary"><i class="fa fa-facebook"></i></b-button>
              </b-input-group-prepend>
              <b-form-input type="email" placeholder="Email"></b-form-input>
              <!-- Attach Left button -->
              <b-input-group-append>
                <b-button variant="primary"><i class="fa fa-twitter"></i></b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <div slot="footer">
            <b-button type="submit" size="sm" variant="success"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
            <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
          </div>
        </b-card>
      </b-col>
      <b-col sm="4">
        <b-card>
          <div slot="header">
            <strong>Dropdowns</strong> Groups
          </div>
          <b-form-group>
              <b-input-group>
                <!-- Attach Left button -->
                <b-input-group-prepend>
                  <b-dropdown text="Action" variant="primary">
                    <b-dropdown-item>Action</b-dropdown-item>
                    <b-dropdown-item>Another action</b-dropdown-item>
                    <b-dropdown-item>Something else here...</b-dropdown-item>
                    <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                  </b-dropdown>
                </b-input-group-prepend>
                <b-form-input placeholder="Username"></b-form-input>
              </b-input-group>
          </b-form-group>
          <b-form-group>
              <b-input-group>
                <b-form-input placeholder="Email"></b-form-input>
                <!-- Attach Right button -->
                <b-input-group-append>
                  <b-dropdown text="Action" variant="primary" right>
                    <b-dropdown-item>Action</b-dropdown-item>
                    <b-dropdown-item>Another action</b-dropdown-item>
                    <b-dropdown-item>Something else here...</b-dropdown-item>
                    <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                  </b-dropdown>
                </b-input-group-append>
              </b-input-group>
          </b-form-group>
          <b-form-group>
              <b-input-group>
                <!-- Attach Left button -->
                <b-input-group-prepend>
                  <b-dropdown text="Split" variant="primary" split>
                    <b-dropdown-item href="#">Action</b-dropdown-item>
                    <b-dropdown-item href="#">Another action</b-dropdown-item>
                    <b-dropdown-item href="#">Something else here...</b-dropdown-item>
                    <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                  </b-dropdown>
                </b-input-group-prepend>
                <b-form-input placeholder="..."></b-form-input>
                <!-- Attach Right button -->
                <b-input-group-append>
                  <b-dropdown text="Action" variant="primary" right>
                    <b-dropdown-item>Action</b-dropdown-item>
                    <b-dropdown-item>Another action</b-dropdown-item>
                    <b-dropdown-item>Something else here...</b-dropdown-item>
                    <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                  </b-dropdown>
                </b-input-group-append>
              </b-input-group>
          </b-form-group>
          <div slot="footer">
            <b-button type="submit" size="sm" variant="success"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
            <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6">
        <b-card>
          <div slot="header">
            Use the grid for big devices! <small><code>.col-lg-*</code> <code>.col-md-*</code> <code>.col-sm-*</code></small>
          </div>
          <b-row class="form-group">
            <b-col md="8">
              <b-form-input type="text" placeholder=".col-md-8"></b-form-input>
            </b-col>
            <b-col md="4">
              <b-form-input type="text" placeholder=".col-md-4"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="form-group">
            <b-col md="7">
              <b-form-input type="text" placeholder=".col-md-7"></b-form-input>
            </b-col>
            <b-col md="5">
              <b-form-input type="text" placeholder=".col-md-5"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="form-group">
            <b-col md="6">
              <b-form-input type="text" placeholder=".col-md-6"></b-form-input>
            </b-col>
            <b-col md="6">
              <b-form-input type="text" placeholder=".col-md-6"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="form-group">
            <b-col md="5">
              <b-form-input type="text" placeholder=".col-md-5"></b-form-input>
            </b-col>
            <b-col md="7">
              <b-form-input type="text" placeholder=".col-md-7"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="form-group">
            <b-col md="4">
              <b-form-input type="text" placeholder=".col-md-4"></b-form-input>
            </b-col>
            <b-col md="8">
              <b-form-input type="text" placeholder=".col-md-8"></b-form-input>
            </b-col>
          </b-row>
          <div slot="footer">
            <b-button type="submit" size="sm" variant="primary">Action</b-button>
            <b-button type="button" size="sm" variant="danger">Action</b-button>
            <b-button type="button" class="btn btn-sm btn-warning">Action</b-button>
            <b-button type="button" class="btn btn-sm btn-info">Action</b-button>
            <b-button type="button" size="sm" variant="success">Action</b-button>
          </div>
        </b-card>
      </b-col>
      <b-col md="6">
        <b-card>
          <div slot="header">
            Input Grid for small devices! <small> <code>.col-*</code></small>
          </div>
          <b-row class="form-group">
            <b-col cols="4">
              <b-form-input type="text" placeholder=".col-4"></b-form-input>
            </b-col>
            <b-col cols="8">
              <b-form-input type="text" placeholder=".col-8"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="form-group">
            <b-col cols="5">
              <b-form-input type="text" placeholder=".col-5"></b-form-input>
            </b-col>
            <b-col cols="7">
              <b-form-input type="text" placeholder=".col-7"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="form-group">
            <b-col cols="6">
              <b-form-input type="text" placeholder=".col-6"></b-form-input>
            </b-col>
            <b-col cols="6">
              <b-form-input type="text" placeholder=".col-6"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="form-group">
            <b-col cols="7">
              <b-form-input type="text" placeholder=".col-5"></b-form-input>
            </b-col>
            <b-col cols="5">
              <b-form-input type="text" placeholder=".col-5"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="form-group">
            <b-col cols="8">
              <b-form-input type="text" placeholder=".col-8"></b-form-input>
            </b-col>
            <b-col cols="4">
              <b-form-input type="text" placeholder=".col-4"></b-form-input>
            </b-col>
          </b-row>
          <div slot="footer">
            <b-button type="submit" size="sm" variant="primary">Action</b-button>
            <b-button type="button" size="sm" variant="danger">Action</b-button>
            <b-button type="button" class="btn btn-sm btn-warning">Action</b-button>
            <b-button type="button" class="btn btn-sm btn-info">Action</b-button>
            <b-button type="button" size="sm" variant="success">Action</b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'forms',
  data () {
    return {
      selected: [] // Must be an array reference!
    }
  },
  methods: {
    click () {
      // do nothing
    }
  }
}
</script>
